"""
Anti-spam utilities for lead form submissions.
Provides honeypot validation, disposable email blocking,
content quality checks, and rate limiting.
"""
import re
import time
from collections import defaultdict

# Disposable/temporary email domains (top 80 most common)
DISPOSABLE_DOMAINS = {
    "mailinator.com", "tempmail.com", "guerrillamail.com", "throwaway.email",
    "yopmail.com", "sharklasers.com", "guerrillamailblock.com", "grr.la",
    "dispostable.com", "trashmail.com", "10minutemail.com", "temp-mail.org",
    "fakeinbox.com", "mailnesia.com", "maildrop.cc", "tempail.com",
    "mohmal.com", "burnermail.io", "inboxkitten.com", "emailondeck.com",
    "getnada.com", "mailsac.com", "harakirimail.com", "dropmail.me",
    "minuteinbox.com", "tempr.email", "mytemp.email", "luxusmail.org",
    "mailforspam.com", "spamgourmet.com", "trashinbox.com", "temp-mail.io",
    "tmpmail.net", "tmpmail.org", "spambox.us", "bobmail.info",
    "devnullmail.com", "discard.email", "discardmail.com", "guerrillamail.info",
    "jetable.org", "mailcatch.com", "maildx.com", "mailexpire.com",
    "mailinator.net", "mailme.lv", "meltmail.com", "mt2015.com",
    "nospam.ze.tc", "putmail.net", "rmqkr.net", "spam4.me",
    "spamfree24.org", "tempomail.fr", "throwam.com", "trashmail.me",
    "trashmail.net", "trbvm.com", "wegwerfmail.de", "yepmail.net",
    "crazymailing.com", "mailnull.com", "nomail.xl.cx", "0-mail.com",
    "mailsucker.net", "binkmail.com", "bobmail.info", "bofthew.com",
    "clrmail.com", "cool.fr.nf", "courriel.fr.nf", "dcemail.com",
    "disposemail.com", "eintagsmail.de", "emailgo.de", "emailisvalid.com",
    "emailresort.com", "emz.net", "fiifke.de", "flurred.com",
    "get-mail.cf", "ghosttexter.de", "girlsundertheinfluence.com",
}

# Known spam patterns in messages
SPAM_PATTERNS = [
    r"(?i)buy\s+(?:viagra|cialis|crypto|bitcoin)",
    r"(?i)(?:click|visit)\s+(?:here|now|this)\s+(?:http|www)",
    r"(?i)(?:earn|make)\s+\$\d+.*(?:per|a)\s+(?:day|hour|week)",
    r"(?i)(?:free|cheap)\s+(?:iphone|gift|money|card)",
    r"(?i)(?:hot|sexy)\s+(?:girl|lady|women|single)",
    r"(?i)(?:casino|poker|lottery|jackpot|slot)",
    r"(?i)(?:nigerian|prince|inheritance|beneficiary)",
    r"https?://\S+\.(?:ru|cn|tk|ml|ga|cf|gq)/",
    r"(?i)(?:weight\s*loss|diet\s*pill|fat\s*burn)",
    r"(?i)(?:seo\s+service|backlink|rank\s+#1|page\s+rank)",
]

# Fields that look like gibberish (random keyboard mashing)
GIBBERISH_RE = re.compile(r'^[bcdfghjklmnpqrstvwxyz]{5,}$', re.I)

# Valid email regex
EMAIL_RE = re.compile(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')

# Rate limiter per IP
_rate_store = defaultdict(list)
RATE_WINDOW = 3600  # 1 hour
RATE_LIMIT = 5  # max submissions per hour per IP


def validate_email(email: str) -> tuple:
    """Validate email format and check for disposable domains.
    Returns (is_valid, error_message)."""
    if not email or not EMAIL_RE.match(email):
        return False, "Please enter a valid email address."
    
    domain = email.split("@")[1].lower()
    if domain in DISPOSABLE_DOMAINS:
        return False, "Please use a business or personal email, not a temporary address."
    
    # Check for obviously fake patterns
    local = email.split("@")[0].lower()
    if local in ("test", "asdf", "qwerty", "aaa", "xxx", "123", "admin", "info"):
        return False, "Please enter your real email address."
    
    if GIBBERISH_RE.match(local):
        return False, "Please enter a valid email address."
    
    return True, ""


def validate_honeypot(data: dict) -> bool:
    """Check if honeypot field was filled (bots fill hidden fields).
    Returns True if submission is spam (honeypot triggered)."""
    hp = data.get("website", "") or data.get("company_url", "") or data.get("fax", "")
    return bool(hp)


def validate_content_quality(name: str, message: str = "", company: str = "") -> tuple:
    """Check for minimum content quality.
    Returns (is_valid, error_message)."""
    # Name checks
    if not name or len(name.strip()) < 2:
        return False, "Please enter your name."
    
    if GIBBERISH_RE.match(name.replace(" ", "")):
        return False, "Please enter a valid name."
    
    # Check for spam patterns in message
    if message:
        for pattern in SPAM_PATTERNS:
            if re.search(pattern, message):
                return False, "Your message was flagged as potential spam. Please rephrase."
        
        # Count URLs in message — too many is spam
        url_count = len(re.findall(r'https?://', message))
        if url_count > 2:
            return False, "Too many links in your message. Please remove some."
    
    return True, ""


def check_rate_limit(ip: str) -> bool:
    """Check if IP has exceeded the submission rate limit.
    Returns True if allowed, False if rate limited."""
    now = time.time()
    
    # Clean old entries
    _rate_store[ip] = [t for t in _rate_store[ip] if now - t < RATE_WINDOW]
    
    if len(_rate_store[ip]) >= RATE_LIMIT:
        return False
    
    _rate_store[ip].append(now)
    return True


def compute_spam_score(data: dict) -> int:
    """Compute a spam likelihood score (0-100). Higher = more likely spam.
    Score >= 70 is considered spam."""
    score = 0
    
    name = data.get("name", "")
    email = data.get("email", "")
    message = data.get("message", "") or ""
    phone = data.get("phone", "")
    
    # Honeypot filled
    if validate_honeypot(data):
        score += 80
    
    # Disposable email
    if email and "@" in email:
        domain = email.split("@")[1].lower()
        if domain in DISPOSABLE_DOMAINS:
            score += 40
    
    # No phone number provided (for business inquiries, unusual)
    if not phone:
        score += 10
    
    # Very short name
    if len(name) < 3:
        score += 15
    
    # Gibberish name
    if GIBBERISH_RE.match(name.replace(" ", "")):
        score += 30
    
    # Spam patterns in message
    for pattern in SPAM_PATTERNS:
        if re.search(pattern, message):
            score += 25
            break
    
    # Too many URLs in message
    if len(re.findall(r'https?://', message)) > 2:
        score += 20
    
    # All-caps message
    if message and message == message.upper() and len(message) > 20:
        score += 15
    
    # Very short or empty message for a contact form
    if len(message) < 10 and data.get("source") == "contact_form":
        score += 10
    
    return min(score, 100)


def validate_submission(data: dict, ip: str) -> tuple:
    """Full validation pipeline for form submissions.
    Returns (is_valid, error_message, spam_score)."""
    
    # Rate limit
    if not check_rate_limit(ip):
        return False, "Too many submissions. Please try again later.", 100
    
    # Honeypot
    if validate_honeypot(data):
        # Don't tell bots why it failed — return success silently
        return False, "__honeypot__", 100
    
    # Email validation
    email_valid, email_err = validate_email(data.get("email", ""))
    if not email_valid:
        return False, email_err, 80
    
    # Content quality
    content_valid, content_err = validate_content_quality(
        data.get("name", ""),
        data.get("message", ""),
        data.get("company", ""),
    )
    if not content_valid:
        return False, content_err, 60
    
    # Spam score
    spam_score = compute_spam_score(data)
    if spam_score >= 70:
        return False, "Your submission was flagged for review. If this is a genuine inquiry, please email us directly.", spam_score
    
    return True, "", spam_score
