import requests
import sys
import json
from datetime import datetime

class BrightluxxAPITester:
    def __init__(self, base_url="https://brightluxx-preview.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.tests_failed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status=200, data=None, params=None):
        """Run a single API test"""
        url = f"{self.base_url}{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, params=params, timeout=30)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=30)
            else:
                response = requests.request(method, url, json=data, headers=headers, params=params, timeout=30)

            success = response.status_code == expected_status
            
            if success:
                self.tests_passed += 1
                print(f"✅ PASSED - Status: {response.status_code}")
                
                # Try to parse JSON response for additional validation
                try:
                    response_data = response.json()
                    if endpoint.startswith('/api/technologies') and method == 'GET' and 'technologies' in response_data:
                        print(f"   📊 Found {len(response_data['technologies'])} technologies")
                    elif endpoint.startswith('/api/applications') and method == 'GET' and 'applications' in response_data:
                        print(f"   📊 Found {len(response_data['applications'])} applications")
                    elif endpoint.startswith('/api/case-studies') and method == 'GET' and 'caseStudies' in response_data:
                        print(f"   📊 Found {len(response_data['caseStudies'])} case studies")
                    elif endpoint.startswith('/api/updates') and method == 'GET' and 'updates' in response_data:
                        print(f"   📊 Found {len(response_data['updates'])} updates")
                    elif 'success' in response_data and response_data['success']:
                        print(f"   ✅ Success response confirmed")
                    return True, response_data
                except:
                    return True, {}
            else:
                self.tests_failed += 1
                self.failed_tests.append({
                    'test': name,
                    'expected': expected_status,
                    'actual': response.status_code,
                    'url': url,
                    'response': response.text[:200] if response.text else 'No response body'
                })
                print(f"❌ FAILED - Expected {expected_status}, got {response.status_code}")
                if response.text:
                    print(f"   Response: {response.text[:200]}...")
                return False, {}

        except requests.exceptions.RequestException as e:
            self.tests_failed += 1
            self.failed_tests.append({
                'test': name,
                'error': str(e),
                'url': url
            })
            print(f"❌ FAILED - Network Error: {str(e)}")
            return False, {}

    def test_health(self):
        """Test health endpoint"""
        return self.run_test("Health Check", "GET", "/api/health")

    def test_technologies_list(self):
        """Test technologies listing"""
        success, data = self.run_test("Technologies List", "GET", "/api/technologies")
        
        if success and 'technologies' in data:
            # Test with category filter
            self.run_test("Technologies by Category", "GET", "/api/technologies", params={'category': 'micro-led'})
            # Test with featured filter
            self.run_test("Featured Technologies", "GET", "/api/technologies", params={'featured': True})
            
            # Get first technology for detail test
            if len(data['technologies']) > 0:
                tech_slug = data['technologies'][0].get('slug')
                if tech_slug:
                    self.run_test(f"Technology Detail - {tech_slug}", "GET", f"/api/technologies/{tech_slug}")
                else:
                    print("⚠️  Warning: Technology missing slug field")
        
        return success

    def test_applications_list(self):
        """Test applications listing"""
        success, data = self.run_test("Applications List", "GET", "/api/applications")
        
        if success and 'applications' in data:
            # Test with featured filter
            self.run_test("Featured Applications", "GET", "/api/applications", params={'featured': True})
            
            # Get first application for detail test
            if len(data['applications']) > 0:
                app_slug = data['applications'][0].get('slug')
                if app_slug:
                    self.run_test(f"Application Detail - {app_slug}", "GET", f"/api/applications/{app_slug}")
                else:
                    print("⚠️  Warning: Application missing slug field")
        
        return success

    def test_case_studies_list(self):
        """Test case studies listing"""
        success, data = self.run_test("Case Studies List", "GET", "/api/case-studies")
        
        if success and 'caseStudies' in data:
            # Test with category filter
            self.run_test("Case Studies by Category", "GET", "/api/case-studies", params={'category': 'retail'})
            # Test with featured filter
            self.run_test("Featured Case Studies", "GET", "/api/case-studies", params={'featured': True})
            
            # Get first case study for detail test
            if len(data['caseStudies']) > 0:
                case_slug = data['caseStudies'][0].get('slug')
                if case_slug:
                    self.run_test(f"Case Study Detail - {case_slug}", "GET", f"/api/case-studies/{case_slug}")
                else:
                    print("⚠️  Warning: Case Study missing slug field")
        
        return success

    def test_updates_list(self):
        """Test updates listing"""
        success, data = self.run_test("Updates List", "GET", "/api/updates")
        
        if success and 'updates' in data:
            # Test with limit
            self.run_test("Updates with Limit", "GET", "/api/updates", params={'limit': 3})
            
            # Get first update for detail test
            if len(data['updates']) > 0:
                update_slug = data['updates'][0].get('slug')
                if update_slug:
                    self.run_test(f"Update Detail - {update_slug}", "GET", f"/api/updates/{update_slug}")
                else:
                    print("⚠️  Warning: Update missing slug field")
        
        return success

    def test_resources_list(self):
        """Test resources listing"""
        return self.run_test("Resources List", "GET", "/api/resources")

    def test_search(self):
        """Test search functionality"""
        # Test search with various queries
        search_queries = ["LED", "display", "outdoor", "micro"]
        
        for query in search_queries:
            self.run_test(f"Search - '{query}'", "GET", "/api/search", params={'q': query})

    def test_create_lead(self):
        """Test lead creation"""
        test_lead = {
            "name": f"Test User {datetime.now().strftime('%H%M%S')}",
            "company": "Test Company Ltd",
            "email": f"test{datetime.now().strftime('%H%M%S')}@example.com",
            "phone": "+971501234567",
            "city": "Dubai",
            "application": "Retail",
            "timeline": "1-3 months",
            "budget": "$50k - $100k",
            "message": "This is a test inquiry from automated testing",
            "source": "contact_form"
        }
        
        success, response_data = self.run_test("Create Lead", "POST", "/api/leads", data=test_lead)
        
        if success and 'success' in response_data:
            print(f"   📧 Lead created with ID: {response_data.get('leadId', 'N/A')}")
        
        return success

    def test_invalid_routes(self):
        """Test invalid routes for proper error handling"""
        # Test non-existent technology
        self.run_test("Invalid Technology", "GET", "/api/technologies/non-existent", expected_status=404)
        
        # Test non-existent application
        self.run_test("Invalid Application", "GET", "/api/applications/non-existent", expected_status=404)
        
        # Test non-existent case study
        self.run_test("Invalid Case Study", "GET", "/api/case-studies/non-existent", expected_status=404)
        
        # Test non-existent update
        self.run_test("Invalid Update", "GET", "/api/updates/non-existent", expected_status=404)

def main():
    print("🚀 Starting Brightluxx API Testing...")
    print("=" * 60)
    
    tester = BrightluxxAPITester()
    
    # Run all tests
    print("\n📋 BASIC API TESTS")
    print("-" * 30)
    tester.test_health()
    
    print("\n📋 CONTENT API TESTS")
    print("-" * 30)
    tester.test_technologies_list()
    tester.test_applications_list() 
    tester.test_case_studies_list()
    tester.test_updates_list()
    tester.test_resources_list()
    
    print("\n📋 FUNCTIONALITY TESTS")
    print("-" * 30)
    tester.test_search()
    tester.test_create_lead()
    
    print("\n📋 ERROR HANDLING TESTS")
    print("-" * 30)
    tester.test_invalid_routes()
    
    # Print final results
    print("\n" + "=" * 60)
    print("📊 FINAL TEST RESULTS")
    print("=" * 60)
    print(f"Total Tests Run: {tester.tests_run}")
    print(f"Tests Passed: {tester.tests_passed} ✅")
    print(f"Tests Failed: {tester.tests_failed} ❌")
    
    if tester.tests_failed > 0:
        print(f"\n❌ FAILED TESTS SUMMARY:")
        for i, failed_test in enumerate(tester.failed_tests, 1):
            print(f"  {i}. {failed_test['test']}")
            if 'expected' in failed_test:
                print(f"     Expected: {failed_test['expected']}, Got: {failed_test['actual']}")
            if 'error' in failed_test:
                print(f"     Error: {failed_test['error']}")
            if 'response' in failed_test:
                print(f"     Response: {failed_test['response']}")
            print(f"     URL: {failed_test['url']}")
    
    success_rate = (tester.tests_passed / tester.tests_run * 100) if tester.tests_run > 0 else 0
    print(f"\n📈 Success Rate: {success_rate:.1f}%")
    
    if success_rate >= 90:
        print("🎉 Backend API is working excellently!")
        return 0
    elif success_rate >= 70:
        print("⚠️  Backend API has some issues but mostly functional")
        return 1
    else:
        print("🚨 Backend API has significant issues")
        return 1

if __name__ == "__main__":
    sys.exit(main())