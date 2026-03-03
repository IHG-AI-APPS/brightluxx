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
                    if endpoint.startswith('/api/products') and method == 'GET' and 'products' in response_data:
                        print(f"   📊 Found {len(response_data['products'])} products")
                    elif endpoint.startswith('/api/inspirations') and method == 'GET' and 'inspirations' in response_data:
                        print(f"   📊 Found {len(response_data['inspirations'])} inspirations")
                    elif endpoint.startswith('/api/projects') and method == 'GET' and 'projects' in response_data:
                        print(f"   📊 Found {len(response_data['projects'])} projects")
                    elif endpoint.startswith('/api/search') and method == 'GET':
                        print(f"   📊 Search completed successfully")
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

    def test_products_endpoints(self):
        """Test all products-related endpoints"""
        # Get all products
        success, data = self.run_test("Products List", "GET", "/api/products")
        
        if success and 'products' in data:
            # Test category filtering
            categories = ['micro-led', 'indoor', 'outdoor', 'rental', 'transparent', 'creative']
            for category in categories:
                self.run_test(f"Products by Category - {category}", "GET", "/api/products", params={'category': category})
            
            # Test featured filter
            self.run_test("Featured Products", "GET", "/api/products", params={'featured': True})
            
            # Test search
            self.run_test("Products Search", "GET", "/api/products", params={'search': 'BL'})
            
            # Get first product for detail test
            if len(data['products']) > 0:
                product = data['products'][0]
                product_slug = product.get('slug')
                if product_slug:
                    self.run_test(f"Product Detail - {product_slug}", "GET", f"/api/products/{product_slug}")
                else:
                    print("⚠️  Warning: Product missing slug field")
                
                # Check if products have BL-prefix codes
                product_code = product.get('product_code', '')
                if product_code.startswith('BL-'):
                    print(f"   ✅ Product has proper BL-prefix code: {product_code}")
                else:
                    print(f"   ⚠️  Product code doesn't have BL-prefix: {product_code}")
        
        return success

    def test_inspirations_endpoints(self):
        """Test all inspirations-related endpoints"""
        success, data = self.run_test("Inspirations List", "GET", "/api/inspirations")
        
        if success and 'inspirations' in data:
            # Test category filtering
            categories = ['retail', 'corporate', 'hospitality', 'events', 'outdoor', 'art']
            for category in categories:
                self.run_test(f"Inspirations by Category - {category}", "GET", "/api/inspirations", params={'category': category})
        
        return success

    def test_projects_endpoints(self):
        """Test all projects-related endpoints"""
        success, data = self.run_test("Projects List", "GET", "/api/projects")
        
        if success and 'projects' in data:
            # Test sector filtering
            sectors = ['retail', 'outdoor', 'corporate', 'hospitality', 'events']
            for sector in sectors:
                self.run_test(f"Projects by Sector - {sector}", "GET", "/api/projects", params={'sector': sector})
            
            # Test featured filter
            self.run_test("Featured Projects", "GET", "/api/projects", params={'featured': True})
            
            # Get first project for detail test
            if len(data['projects']) > 0:
                project_slug = data['projects'][0].get('slug')
                if project_slug:
                    self.run_test(f"Project Detail - {project_slug}", "GET", f"/api/projects/{project_slug}")
                else:
                    print("⚠️  Warning: Project missing slug field")
        
        return success

    def test_search(self):
        """Test search functionality"""
        search_queries = ["LED", "BL-", "display", "outdoor", "micro"]
        
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
        
        success, response_data = self.run_test("Create Lead", "POST", "/api/leads", data=test_lead, expected_status=200)
        
        if success and 'success' in response_data:
            print(f"   📧 Lead created with ID: {response_data.get('leadId', 'N/A')}")
        
        return success

    def test_invalid_routes(self):
        """Test invalid routes for proper error handling"""
        # Test non-existent product
        self.run_test("Invalid Product", "GET", "/api/products/non-existent", expected_status=404)
        
        # Test non-existent project
        self.run_test("Invalid Project", "GET", "/api/projects/non-existent", expected_status=404)

    def test_expected_data_counts(self):
        """Test if we have the expected number of data entries"""
        print("\n📊 CHECKING EXPECTED DATA COUNTS")
        print("-" * 40)
        
        # Check products count (expecting 12)
        success, data = self.run_test("Products Count Check", "GET", "/api/products")
        if success and 'products' in data:
            product_count = len(data['products'])
            if product_count >= 12:
                print(f"   ✅ Products count: {product_count} (>= 12 expected)")
            else:
                print(f"   ⚠️  Products count: {product_count} (< 12 expected)")
        
        # Check inspirations count (expecting 12)
        success, data = self.run_test("Inspirations Count Check", "GET", "/api/inspirations")
        if success and 'inspirations' in data:
            inspiration_count = len(data['inspirations'])
            if inspiration_count >= 12:
                print(f"   ✅ Inspirations count: {inspiration_count} (>= 12 expected)")
            else:
                print(f"   ⚠️  Inspirations count: {inspiration_count} (< 12 expected)")
        
        # Check projects count (expecting 6)
        success, data = self.run_test("Projects Count Check", "GET", "/api/projects")
        if success and 'projects' in data:
            project_count = len(data['projects'])
            if project_count >= 6:
                print(f"   ✅ Projects count: {project_count} (>= 6 expected)")
            else:
                print(f"   ⚠️  Projects count: {project_count} (< 6 expected)")

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
    tester.test_products_endpoints()
    tester.test_inspirations_endpoints() 
    tester.test_projects_endpoints()
    
    print("\n📋 FUNCTIONALITY TESTS")
    print("-" * 30)
    tester.test_search()
    tester.test_create_lead()
    
    print("\n📋 ERROR HANDLING TESTS")
    print("-" * 30)
    tester.test_invalid_routes()
    
    # Check expected data counts
    tester.test_expected_data_counts()
    
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