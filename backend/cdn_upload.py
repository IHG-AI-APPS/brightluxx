"""
CDN Upload Helper - Uploads files to external CDN server via SFTP.
"""
import paramiko
from io import BytesIO
import os

# External CDN configuration
CDN_HOST = "178.128.28.178"
CDN_USER = "root"
CDN_PASS = "IhG@1HGB$2026$W3b"
CDN_BASE_PATH = "/var/brightluxx"
CDN_BASE_URL = "https://files.ihgbrands.com/brightluxx"


def upload_to_cdn(filename: str, content: bytes, subfolder: str = "uploads") -> str:
    """
    Upload file to external CDN server via SFTP.
    
    Args:
        filename: The filename to save as
        content: The file content as bytes
        subfolder: Subfolder under /var/brightluxx/ (default: uploads)
    
    Returns:
        The full CDN URL for the uploaded file
    """
    try:
        # Connect via SSH/SFTP
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        ssh.connect(CDN_HOST, username=CDN_USER, password=CDN_PASS, timeout=30)
        
        sftp = ssh.open_sftp()
        
        # Ensure directory exists
        full_path = f"{CDN_BASE_PATH}/{subfolder}"
        try:
            sftp.stat(full_path)
        except FileNotFoundError:
            # Create directory recursively
            parts = full_path.split('/')
            current = ''
            for part in parts:
                if part:
                    current += f'/{part}'
                    try:
                        sftp.stat(current)
                    except FileNotFoundError:
                        sftp.mkdir(current)
        
        # Upload file
        remote_path = f"{full_path}/{filename}"
        with sftp.file(remote_path, 'wb') as f:
            f.write(content)
        
        # Set permissions
        sftp.chmod(remote_path, 0o644)
        
        sftp.close()
        ssh.close()
        
        return f"{CDN_BASE_URL}/{subfolder}/{filename}"
    except Exception as e:
        print(f"CDN upload error: {e}")
        raise Exception(f"Failed to upload to CDN: {str(e)}")


def upload_image_to_cdn(filename: str, content: bytes, category: str = "uploads") -> str:
    """Upload an image to the CDN."""
    return upload_to_cdn(filename, content, category)


def upload_video_to_cdn(filename: str, content: bytes) -> str:
    """Upload a video to the CDN."""
    return upload_to_cdn(filename, content, "videos")


def upload_document_to_cdn(filename: str, content: bytes) -> str:
    """Upload a document (PDF, etc.) to the CDN."""
    return upload_to_cdn(filename, content, "resources")
