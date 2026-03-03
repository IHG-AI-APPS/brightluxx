"""
Brightluxx LED Showcase Backend API Testing - Expanded Catalog
Tests the expansion from 24 to 41 products across 17 categories
"""
import requests
import json
import sys
from datetime import datetime

class BrightluxxAPITester:
    def __init__(self, base_url="https://brightluxx-preview-1.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status=200, data=None, validation_func=None):
        """Run a single API test with optional validation"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}
        
        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers)
            
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

    def run_all_tests(self):
        """Run all API tests for the expansion"""
        print("🚀 Starting Brightluxx API Tests - Product Catalog Expansion")
        print("=" * 70)
        
        # Test core expansion requirements
        self.test_health_check()
        self.test_total_products()
        self.test_categories_count()
        self.test_new_category_filters()
        self.test_expanded_categories()
        self.test_new_product_comparison()
        self.test_search_functionality() 
        self.test_calculator_still_works()
        
        # Print results
        print("\n" + "=" * 70)
        print(f"📊 Test Results: {self.tests_passed}/{self.tests_run} tests passed")
        
        if self.failed_tests:
            print(f"❌ Failed Tests: {', '.join(self.failed_tests)}")
            return 1
        else:
            print("✅ All expansion tests passed!")
            return 0

def main():
    tester = BrightluxxAPITester()
    return tester.run_all_tests()

if __name__ == "__main__":
    sys.exit(main())