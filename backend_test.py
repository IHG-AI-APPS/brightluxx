"""
Brightluxx LED Showcase Backend API Testing - CMS Admin Panel
Tests both public APIs and admin panel functionality
"""
import requests
import json
import sys
from datetime import datetime
import uuid

class BrightluxxAPITester:
    def __init__(self, base_url="https://display-spec.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []
        self.token = None  # JWT token for admin API calls

    def run_test(self, name, method, endpoint, expected_status=200, data=None, validation_func=None, requires_auth=False):
        """Run a single API test with optional validation"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}
        
        # Add authorization header for admin API calls
        if requires_auth and self.token:
            headers['Authorization'] = f'Bearer {self.token}'
        
        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers)
            
            success = response.status_code == expected_status
            response_data = response.json() if response.headers.get('content-type', '').startswith('application/json') else {}
            
            if success and validation_func:
                validation_result = validation_func(response_data)
                if isinstance(validation_result, tuple):
                    success, validation_msg = validation_result
                else:
                    success = validation_result
                    validation_msg = ""
            else:
                validation_msg = ""
            
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code} {validation_msg}")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                if validation_msg:
                    print(f"   Validation: {validation_msg}")
                if response_data and 'detail' in response_data:
                    print(f"   Error: {response_data['detail']}")
                self.failed_tests.append(name)
            
            return success, response_data
        
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failed_tests.append(name)
            return False, {}

    def test_total_products(self):
        """Test that total products is now 41 (expanded from 24)"""
        def validate_total(data):
            products = data.get('products', [])
            count = len(products)
            if count == 41:
                return True, f"- Found {count} products (expansion successful)"
            return False, f"- Expected 41 products, found {count}"
        
        return self.run_test(
            "GET /api/products returns 41 products total",
            "GET", "api/products",
            validation_func=validate_total
        )

    def test_categories_count(self):
        """Test that categories endpoint returns 17 categories"""
        def validate_categories(data):
            categories = data.get('categories', [])
            count = len(categories)
            if count == 17:
                return True, f"- Found {count} categories"
            return False, f"- Expected 17 categories, found {count}"
        
        return self.run_test(
            "GET /api/products/categories returns all 17 categories",
            "GET", "api/products/categories",
            validation_func=validate_categories
        )

    def test_new_category_filters(self):
        """Test filtering for the 7 new categories"""
        new_categories = [
            ('naked-eye-3d', 2),
            ('cinema-led', 2),
            ('sphere', 2),
            ('virtual-production', 2),
            ('poster-totem', 2),
            ('shelf-edge', 2),
            ('ceiling-led', 2),
        ]
        
        results = []
        for category, expected_count in new_categories:
            def validate_category_count(data, expected=expected_count):
                products = data.get('products', [])
                count = len(products)
                if count == expected:
                    return True, f"- Found {count} products in {category}"
                return False, f"- Expected {expected} products in {category}, found {count}"
            
            success, _ = self.run_test(
                f"GET /api/products?category={category} returns {expected_count} products",
                "GET", f"api/products?category={category}",
                validation_func=validate_category_count
            )
            results.append(success)
        
        return all(results)

    def test_expanded_categories(self):
        """Test DVLED (expanded to 3) and Outdoor (expanded to 5) categories"""
        expanded_categories = [
            ('dvled', 3),
            ('outdoor', 5),
        ]
        
        results = []
        for category, expected_count in expanded_categories:
            def validate_expanded_count(data, expected=expected_count):
                products = data.get('products', [])
                count = len(products)
                if count == expected:
                    return True, f"- Found {count} products in {category} (expanded successfully)"
                return False, f"- Expected {expected} products in {category}, found {count}"
            
            success, _ = self.run_test(
                f"GET /api/products?category={category} returns {expected_count} products (expanded)",
                "GET", f"api/products?category={category}",
                validation_func=validate_expanded_count
            )
            results.append(success)
        
        return all(results)

    def test_new_product_comparison(self):
        """Test comparison with new product codes from the expansion"""
        new_product_codes = ['BL-3DL390', 'BL-CNX093', 'BL-SPH300']
        
        def validate_comparison(data):
            products = data.get('products', [])
            count = len(products)
            if count == 3:
                # Check if we got the right product codes
                returned_codes = [p.get('product_code', '') for p in products]
                if all(code in returned_codes for code in new_product_codes):
                    return True, f"- Successfully compared 3 new products: {', '.join(returned_codes)}"
                else:
                    return False, f"- Missing some product codes. Got: {returned_codes}"
            return False, f"- Expected 3 products, got {count}"
        
        return self.run_test(
            "POST /api/products/compare with new product codes returns 3 products",
            "POST", "api/products/compare",
            data=new_product_codes,
            validation_func=validate_comparison
        )

    def test_search_functionality(self):
        """Test search functionality still works with expanded catalog"""
        def validate_search(data):
            products = data.get('products', [])
            count = len(products)
            if count >= 1:
                # Check if any returned products contain 'sphere' in name/code/description
                sphere_found = any(
                    'sphere' in str(p.get('name', '')).lower() or
                    'sphere' in str(p.get('product_code', '')).lower() or 
                    'sphere' in str(p.get('description', '')).lower()
                    for p in products
                )
                if sphere_found:
                    return True, f"- Found {count} sphere-related products"
                else:
                    return False, f"- Found {count} products but none sphere-related"
            return False, f"- No products found for 'sphere' search"
        
        return self.run_test(
            "GET /api/products?search=sphere returns sphere products",
            "GET", "api/products?search=sphere",
            validation_func=validate_search
        )

    def test_calculator_still_works(self):
        """Test that calculator API still works after expansion"""
        test_data = {
            "venue_width": 10,
            "venue_height": 4,
            "viewing_distance": 6,
            "content_type": "video",
            "indoor": True
        }
        
        def validate_calculator(data):
            required_keys = ['recommended_pitch', 'screen_width', 'screen_height', 'resolution', 'brightness']
            if all(key in data for key in required_keys):
                matching_products = data.get('matching_products', [])
                return True, f"- Calculator working, found {len(matching_products)} matching products"
            return False, "- Missing required calculation fields"
        
        return self.run_test(
            "POST /api/calculator/screen-size still works after expansion",
            "POST", "api/calculator/screen-size",
            data=test_data,
            validation_func=validate_calculator
        )

    def test_health_check(self):
        """Basic health check"""
        def validate_health(data):
            if data.get('status') == 'ok':
                return True, "- API healthy"
            return False, "- API not healthy"
        
        return self.run_test(
            "GET /api/health returns ok",
            "GET", "api/health",
            validation_func=validate_health
        )

    # ==================== ADMIN API TESTS ====================
    
    def test_admin_login_valid(self):
        """Test admin login with correct credentials"""
        def validate_login(data):
            if 'token' in data and 'admin' in data:
                self.token = data['token']  # Store token for subsequent requests
                return True, f"- Login successful, admin: {data['admin'].get('email')}"
            return False, "- Missing token or admin data"
        
        return self.run_test(
            "POST /api/admin/login with correct credentials",
            "POST", "api/admin/login",
            data={"email": "admin@brightluxx.com", "password": "brightluxx2025"},
            validation_func=validate_login
        )

    def test_admin_login_invalid(self):
        """Test admin login with wrong password returns 401"""
        return self.run_test(
            "POST /api/admin/login with wrong password returns 401",
            "POST", "api/admin/login",
            expected_status=401,
            data={"email": "admin@brightluxx.com", "password": "wrong-password"}
        )

    def test_admin_me_with_token(self):
        """Test admin me endpoint with valid token"""
        def validate_admin_me(data):
            if 'email' in data and data['email'] == 'admin@brightluxx.com':
                return True, f"- Admin info retrieved: {data.get('name', 'Admin')}"
            return False, "- Invalid admin data"
        
        return self.run_test(
            "GET /api/admin/me with valid token",
            "GET", "api/admin/me",
            validation_func=validate_admin_me,
            requires_auth=True
        )

    def test_admin_me_without_token(self):
        """Test admin me endpoint without token returns 401"""
        return self.run_test(
            "GET /api/admin/me without token returns 401",
            "GET", "api/admin/me",
            expected_status=401
        )

    def test_admin_stats(self):
        """Test admin dashboard statistics"""
        def validate_stats(data):
            required_keys = ['products', 'inspirations', 'projects', 'leads']
            if all(key in data for key in required_keys):
                stats_msg = f"Products: {data['products']}, Inspirations: {data['inspirations']}, Projects: {data['projects']}, Leads: {data['leads']}"
                return True, f"- Dashboard stats: {stats_msg}"
            return False, "- Missing required stat fields"
        
        return self.run_test(
            "GET /api/admin/stats returns dashboard statistics",
            "GET", "api/admin/stats",
            validation_func=validate_stats,
            requires_auth=True
        )

    def test_admin_products_list(self):
        """Test admin products list endpoint"""
        def validate_products_list(data):
            if 'products' in data and 'total' in data:
                product_count = len(data['products'])
                total_count = data['total']
                return True, f"- Retrieved {product_count} products, total: {total_count}"
            return False, "- Missing products or total field"
        
        return self.run_test(
            "GET /api/admin/products returns paginated product list",
            "GET", "api/admin/products",
            validation_func=validate_products_list,
            requires_auth=True
        )

    def test_admin_products_search(self):
        """Test admin products search functionality"""
        def validate_search_results(data):
            products = data.get('products', [])
            if products:
                # Check if any product contains 'sphere' in name or product_code
                sphere_found = any(
                    'sphere' in str(p.get('name', '')).lower() or
                    'sphere' in str(p.get('product_code', '')).lower()
                    for p in products
                )
                return sphere_found, f"- Found {len(products)} sphere products"
            return True, "- No products found for sphere search"
        
        return self.run_test(
            "GET /api/admin/products?search=sphere returns filtered products",
            "GET", "api/admin/products?search=sphere",
            validation_func=validate_search_results,
            requires_auth=True
        )

    def test_admin_products_category_filter(self):
        """Test admin products category filtering"""
        def validate_category_filter(data):
            products = data.get('products', [])
            if products:
                # All products should be in outdoor category
                outdoor_products = [p for p in products if p.get('category') == 'outdoor']
                if len(outdoor_products) == len(products):
                    return True, f"- Found {len(outdoor_products)} outdoor products"
                else:
                    return False, f"- Not all products are outdoor category"
            return True, "- No outdoor products found"
        
        return self.run_test(
            "GET /api/admin/products?category=outdoor returns only outdoor products",
            "GET", "api/admin/products?category=outdoor",
            validation_func=validate_category_filter,
            requires_auth=True
        )

    def test_admin_create_product(self):
        """Test creating a new product via admin API"""
        test_product = {
            "product_code": f"TEST-{uuid.uuid4().hex[:6].upper()}",
            "name": "Test LED Display",
            "category": "test-category",
            "tagline": "Testing product creation",
            "description": "This is a test product created via API",
            "pixel_pitch": "2.5mm",
            "resolution": "1920x1080",
            "brightness": "1000 nits",
            "application": "Testing",
            "featured": False,
            "trending": False,
            "new_arrival": True,
            "status": "published"
        }
        
        def validate_product_creation(data):
            if 'success' in data and data['success'] and 'product' in data:
                created_product = data['product']
                self.test_product_id = created_product.get('id')  # Store for later deletion
                return True, f"- Product created with ID: {self.test_product_id}"
            return False, "- Product creation failed"
        
        return self.run_test(
            "POST /api/admin/products creates a new product",
            "POST", "api/admin/products",
            expected_status=200,
            data=test_product,
            validation_func=validate_product_creation,
            requires_auth=True
        )

    def test_admin_update_product(self):
        """Test updating a product via admin API"""
        if not hasattr(self, 'test_product_id'):
            print("❌ Skipped - No test product to update")
            return False
        
        update_data = {
            "product_code": f"UPDATED-{uuid.uuid4().hex[:6].upper()}",
            "name": "Updated Test LED Display",
            "category": "updated-category",
            "tagline": "Updated tagline",
            "description": "This product has been updated via API",
            "pixel_pitch": "3.0mm",
            "resolution": "2560x1440",
            "brightness": "1200 nits",
            "application": "Updated Testing",
            "featured": True,
            "trending": False,
            "new_arrival": False,
            "status": "published"
        }
        
        def validate_product_update(data):
            if 'success' in data and data['success'] and 'product' in data:
                updated_product = data['product']
                return True, f"- Product updated: {updated_product.get('name')}"
            return False, "- Product update failed"
        
        return self.run_test(
            f"PUT /api/admin/products/{self.test_product_id} updates product",
            "PUT", f"api/admin/products/{self.test_product_id}",
            data=update_data,
            validation_func=validate_product_update,
            requires_auth=True
        )

    def test_admin_delete_product(self):
        """Test deleting a product via admin API"""
        if not hasattr(self, 'test_product_id'):
            print("❌ Skipped - No test product to delete")
            return False
        
        def validate_product_deletion(data):
            if 'success' in data and data['success']:
                return True, "- Product deleted successfully"
            return False, "- Product deletion failed"
        
        return self.run_test(
            f"DELETE /api/admin/products/{self.test_product_id} deletes product",
            "DELETE", f"api/admin/products/{self.test_product_id}",
            validation_func=validate_product_deletion,
            requires_auth=True
        )

    def test_admin_bulk_delete_products(self):
        """Test bulk delete products"""
        # Create two test products first
        test_ids = []
        for i in range(2):
            product_data = {
                "product_code": f"BULK-{uuid.uuid4().hex[:6].upper()}",
                "name": f"Bulk Test Product {i+1}",
                "category": "bulk-test",
                "status": "published"
            }
            
            success, data = self.run_test(
                f"Create bulk test product {i+1}",
                "POST", "api/admin/products",
                data=product_data,
                requires_auth=True
            )
            
            if success and 'product' in data:
                test_ids.append(data['product']['id'])
        
        if len(test_ids) < 2:
            print("❌ Skipped - Could not create test products for bulk delete")
            return False
        
        def validate_bulk_delete(data):
            if 'success' in data and data['success']:
                deleted_count = data.get('deleted', 0)
                return True, f"- Bulk deleted {deleted_count} products"
            return False, "- Bulk delete failed"
        
        return self.run_test(
            "POST /api/admin/products/bulk-delete deletes multiple products",
            "POST", "api/admin/products/bulk-delete",
            data=test_ids,
            validation_func=validate_bulk_delete,
            requires_auth=True
        )

    def test_admin_inspirations_list(self):
        """Test admin inspirations list"""
        def validate_inspirations_list(data):
            if 'inspirations' in data and 'total' in data:
                count = len(data['inspirations'])
                total = data['total']
                return True, f"- Retrieved {count} inspirations, total: {total}"
            return False, "- Missing inspirations or total field"
        
        return self.run_test(
            "GET /api/admin/inspirations returns paginated inspiration list",
            "GET", "api/admin/inspirations",
            validation_func=validate_inspirations_list,
            requires_auth=True
        )

    def test_admin_create_inspiration(self):
        """Test creating a new inspiration"""
        test_inspiration = {
            "title": "Test Inspiration",
            "category": "test-category",
            "description": "This is a test inspiration",
            "image_url": "https://example.com/test-image.jpg",
            "featured": True,
            "status": "published"
        }
        
        def validate_inspiration_creation(data):
            if 'success' in data and data['success'] and 'inspiration' in data:
                created = data['inspiration']
                self.test_inspiration_id = created.get('id')
                return True, f"- Inspiration created: {created.get('title')}"
            return False, "- Inspiration creation failed"
        
        return self.run_test(
            "POST /api/admin/inspirations creates a new inspiration",
            "POST", "api/admin/inspirations",
            data=test_inspiration,
            validation_func=validate_inspiration_creation,
            requires_auth=True
        )

    def test_admin_update_inspiration(self):
        """Test updating an inspiration"""
        if not hasattr(self, 'test_inspiration_id'):
            print("❌ Skipped - No test inspiration to update")
            return False
        
        update_data = {
            "title": "Updated Test Inspiration",
            "category": "updated-category",
            "description": "Updated description",
            "image_url": "https://example.com/updated-image.jpg",
            "featured": False,
            "status": "published"
        }
        
        def validate_inspiration_update(data):
            if 'success' in data and data['success']:
                return True, "- Inspiration updated successfully"
            return False, "- Inspiration update failed"
        
        return self.run_test(
            f"PUT /api/admin/inspirations/{self.test_inspiration_id} updates inspiration",
            "PUT", f"api/admin/inspirations/{self.test_inspiration_id}",
            data=update_data,
            validation_func=validate_inspiration_update,
            requires_auth=True
        )

    def test_admin_delete_inspiration(self):
        """Test deleting an inspiration"""
        if not hasattr(self, 'test_inspiration_id'):
            print("❌ Skipped - No test inspiration to delete")
            return False
        
        def validate_inspiration_deletion(data):
            if 'success' in data and data['success']:
                return True, "- Inspiration deleted successfully"
            return False, "- Inspiration deletion failed"
        
        return self.run_test(
            f"DELETE /api/admin/inspirations/{self.test_inspiration_id} deletes inspiration",
            "DELETE", f"api/admin/inspirations/{self.test_inspiration_id}",
            validation_func=validate_inspiration_deletion,
            requires_auth=True
        )

    def test_admin_projects_list(self):
        """Test admin projects list"""
        def validate_projects_list(data):
            if 'projects' in data and 'total' in data:
                count = len(data['projects'])
                total = data['total']
                return True, f"- Retrieved {count} projects, total: {total}"
            return False, "- Missing projects or total field"
        
        return self.run_test(
            "GET /api/admin/projects returns paginated project list",
            "GET", "api/admin/projects",
            validation_func=validate_projects_list,
            requires_auth=True
        )

    def test_admin_create_project(self):
        """Test creating a new project"""
        test_project = {
            "title": "Test Project",
            "client_name": "Test Client",
            "location": "Test Location",
            "sector": "test-sector",
            "screen_size": "10x5m",
            "description": "This is a test project",
            "image_url": "https://example.com/test-project.jpg",
            "featured": True,
            "status": "published"
        }
        
        def validate_project_creation(data):
            if 'success' in data and data['success'] and 'project' in data:
                created = data['project']
                self.test_project_id = created.get('id')
                return True, f"- Project created: {created.get('title')}"
            return False, "- Project creation failed"
        
        return self.run_test(
            "POST /api/admin/projects creates a new project",
            "POST", "api/admin/projects",
            data=test_project,
            validation_func=validate_project_creation,
            requires_auth=True
        )

    def test_admin_leads_list(self):
        """Test admin leads list with status filter"""
        def validate_leads_list(data):
            if 'leads' in data and 'total' in data:
                count = len(data['leads'])
                total = data['total']
                return True, f"- Retrieved {count} leads, total: {total}"
            return False, "- Missing leads or total field"
        
        return self.run_test(
            "GET /api/admin/leads returns paginated leads",
            "GET", "api/admin/leads",
            validation_func=validate_leads_list,
            requires_auth=True
        )

    def test_admin_update_lead(self):
        """Test updating lead status and notes"""
        # First create a test lead via public API
        test_lead = {
            "name": "Test Lead",
            "email": "test@example.com",
            "phone": "+1234567890",
            "city": "Test City",
            "application": "Test Application",
            "timeline": "ASAP",
            "budget": "$10,000",
            "message": "This is a test lead"
        }
        
        # Create lead via public API
        success, lead_data = self.run_test(
            "Create test lead for admin testing",
            "POST", "api/leads",
            data=test_lead
        )
        
        if not success:
            print("❌ Skipped - Could not create test lead")
            return False
        
        # Get leads to find our test lead
        success, admin_leads_data = self.run_test(
            "Get leads to find test lead",
            "GET", "api/admin/leads?search=test@example.com",
            requires_auth=True
        )
        
        if not success or not admin_leads_data.get('leads'):
            print("❌ Skipped - Could not find test lead")
            return False
        
        test_lead_id = admin_leads_data['leads'][0]['id']
        
        # Update the lead status and notes
        update_data = {
            "status": "qualified",
            "notes": "Updated via API test - qualified lead"
        }
        
        def validate_lead_update(data):
            if 'success' in data and data['success']:
                return True, "- Lead updated successfully"
            return False, "- Lead update failed"
        
        return self.run_test(
            f"PUT /api/admin/leads/{test_lead_id} updates lead status and notes",
            "PUT", f"api/admin/leads/{test_lead_id}",
            data=update_data,
            validation_func=validate_lead_update,
            requires_auth=True
        )

    def test_admin_export_products(self):
        """Test exporting products"""
        def validate_export(data):
            if 'data' in data and 'count' in data:
                count = data['count']
                return True, f"- Exported {count} products"
            return False, "- Export failed"
        
        return self.run_test(
            "GET /api/admin/export/products returns all products for export",
            "GET", "api/admin/export/products",
            validation_func=validate_export,
            requires_auth=True
        )

    def test_admin_import_products(self):
        """Test importing products"""
        # Create test import data
        import_data = [{
            "product_code": f"IMPORT-{uuid.uuid4().hex[:6].upper()}",
            "name": "Imported Test Product",
            "category": "imported",
            "status": "published"
        }]
        
        def validate_import(data):
            if 'success' in data and data['success']:
                imported_count = data.get('imported', 0)
                return True, f"- Imported {imported_count} products"
            return False, "- Import failed"
        
        return self.run_test(
            "POST /api/admin/import/products imports new products",
            "POST", "api/admin/import/products",
            data=import_data,
            validation_func=validate_import,
            requires_auth=True
        )

    def run_all_tests(self):
        """Run all API tests for both public and admin functionality"""
        print("🚀 Starting Brightluxx API Tests - Public APIs + CMS Admin Panel")
        print("=" * 70)
        
        # Test public APIs first
        print("\n📱 Testing Public APIs...")
        self.test_health_check()
        self.test_total_products()
        self.test_categories_count()
        self.test_new_category_filters()
        self.test_expanded_categories()
        self.test_new_product_comparison()
        self.test_search_functionality() 
        self.test_calculator_still_works()
        
        # Test admin APIs
        print("\n🔐 Testing Admin APIs...")
        
        # Authentication tests
        if not self.test_admin_login_valid():
            print("❌ Admin login failed - skipping remaining admin tests")
            return self._print_results()
        
        self.test_admin_login_invalid()
        self.test_admin_me_with_token()
        self.test_admin_me_without_token()
        
        # Dashboard and stats
        self.test_admin_stats()
        
        # Products CRUD
        self.test_admin_products_list()
        self.test_admin_products_search()
        self.test_admin_products_category_filter()
        self.test_admin_create_product()
        self.test_admin_update_product()
        self.test_admin_delete_product()
        self.test_admin_bulk_delete_products()
        
        # Inspirations CRUD
        self.test_admin_inspirations_list()
        self.test_admin_create_inspiration()
        self.test_admin_update_inspiration()
        self.test_admin_delete_inspiration()
        
        # Projects
        self.test_admin_projects_list()
        self.test_admin_create_project()
        
        # Leads management
        self.test_admin_leads_list()
        self.test_admin_update_lead()
        
        # Export/Import
        self.test_admin_export_products()
        self.test_admin_import_products()
        
        return self._print_results()
    
    def _print_results(self):
        """Print test results and return exit code"""
        # Print results
        print("\n" + "=" * 70)
        print(f"📊 Test Results: {self.tests_passed}/{self.tests_run} tests passed")
        
        if self.failed_tests:
            print(f"❌ Failed Tests: {', '.join(self.failed_tests)}")
            return 1
        else:
            print("✅ All tests passed!")
            return 0

def main():
    tester = BrightluxxAPITester()
    return tester.run_all_tests()

if __name__ == "__main__":
    sys.exit(main())