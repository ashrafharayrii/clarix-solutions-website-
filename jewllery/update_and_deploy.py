import os
import re
import sys
from datetime import datetime
import glob

# Ensure UTF-8 output on Windows
if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

class ReportUpdater:
    def __init__(self):
        self.today = datetime.now().strftime('%Y-%m-%d')
        
    def find_latest_report(self):
        """Find the most recent Sales_Performance_Report file"""
        pattern = 'Sales_Performance_Report_*.html'
        reports = glob.glob(pattern)
        
        if not reports:
            print("❌ No sales reports found!")
            return None
        
        # Sort by filename (which includes date) to get the latest
        reports.sort(reverse=True)
        latest = reports[0]
        
        print(f"✅ Latest report found: {latest}")
        return latest
    
    def update_index_html(self, latest_report):
        """Update index.html with the latest report filename"""
        index_file = 'index.html'
        
        if not os.path.exists(index_file):
            print(f"❌ {index_file} not found!")
            return False
        
        print(f"\n📝 Updating {index_file}...")
        
        # Read the file
        with open(index_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Find and replace the old report filename with the new one
        # Pattern: Sales_Performance_Report_YYYY-MM-DD.html
        pattern = r"window\.location\.href = 'Sales_Performance_Report_\d{4}-\d{2}-\d{2}\.html';"
        replacement = f"window.location.href = '{latest_report}';"
        
        # Check if pattern exists
        if not re.search(pattern, content):
            print(f"   ⚠️  Pattern not found in {index_file}")
            print(f"   💡 Trying alternative pattern...")
            
            # Try alternative pattern
            pattern = r'Sales_Performance_Report_\d{4}-\d{2}-\d{2}\.html'
            if re.search(pattern, content):
                content = re.sub(pattern, latest_report, content)
                print(f"   ✅ Updated using alternative pattern")
            else:
                print(f"   ❌ Could not find pattern to update")
                return False
        else:
            content = re.sub(pattern, replacement, content)
            print(f"   ✅ Updated redirect to: {latest_report}")
        
        # Save the updated file
        with open(index_file, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"   ✅ {index_file} updated successfully!")
        return True
    
    def update_main_report_html(self, latest_report):
        """Update main-report.html with the latest report filename"""
        main_report_file = 'main-report.html'
        
        if not os.path.exists(main_report_file):
            print(f"❌ {main_report_file} not found!")
            return False
        
        print(f"\n📝 Updating {main_report_file}...")
        
        # Read the file
        with open(main_report_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Find and replace the old report filename with the new one
        pattern = r"window\.location\.href = 'Sales_Performance_Report_\d{4}-\d{2}-\d{2}\.html';"
        replacement = f"window.location.href = '{latest_report}';"
        
        # Check if pattern exists
        if not re.search(pattern, content):
            print(f"   ⚠️  Pattern not found in {main_report_file}")
            print(f"   💡 Trying alternative pattern...")
            
            # Try alternative pattern
            pattern = r'Sales_Performance_Report_\d{4}-\d{2}-\d{2}\.html'
            if re.search(pattern, content):
                content = re.sub(pattern, latest_report, content)
                print(f"   ✅ Updated using alternative pattern")
            else:
                print(f"   ❌ Could not find pattern to update")
                return False
        else:
            content = re.sub(pattern, replacement, content)
            print(f"   ✅ Updated redirect to: {latest_report}")
        
        # Save the updated file
        with open(main_report_file, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"   ✅ {main_report_file} updated successfully!")
        return True
    
    def update_branches_html(self, latest_report):
        """Update branches.html with the latest report filename"""
        branches_file = 'branches.html'
        
        if not os.path.exists(branches_file):
            print(f"⚠️  {branches_file} not found (optional)")
            return True  # Not critical if this file doesn't exist
        
        print(f"\n📝 Updating {branches_file}...")
        
        # Read the file
        with open(branches_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Find and replace the old report filename with the new one
        pattern = r'Sales_Performance_Report_\d{4}-\d{2}-\d{2}\.html'
        content = re.sub(pattern, latest_report, content)
        
        # Save the updated file
        with open(branches_file, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"   ✅ {branches_file} updated successfully!")
        return True
    
    def show_files_to_upload(self):
        """Show which files need to be uploaded to Netlify"""
        print("\n" + "="*60)
        print("📤 FILES TO UPLOAD TO NETLIFY:")
        print("="*60)
        
        files_to_upload = []
        
        # Check which files exist and have been updated
        check_files = [
            'index.html',
            'main-report.html',
            'branches.html'
        ]
        
        # Add all report files
        report_files = glob.glob('*_report.html') + glob.glob('Sales_Performance_Report_*.html')
        
        all_files = check_files + report_files
        
        for file in all_files:
            if os.path.exists(file):
                files_to_upload.append(file)
                print(f"   ✅ {file}")
        
        print("\n" + "="*60)
        print("🚀 NEXT STEPS:")
        print("="*60)
        print("1. Go to: https://app.netlify.com/sites/ashrafharayri/deploys")
        print("2. Drag and drop these files (or upload as ZIP)")
        print("3. Wait 10-20 seconds")
        print("4. Done! ✅")
        print("\n🔗 Your site: https://ashrafharayri.netlify.app/")
        
        return files_to_upload
    
    def run(self):
        """Run the complete update process"""
        print("\n" + "="*70)
        print("🔄 AUTOMATIC REPORT DATE UPDATER")
        print("="*70)
        
        # Step 1: Find the latest report
        latest_report = self.find_latest_report()
        
        if not latest_report:
            print("\n❌ Update failed: No reports found")
            return False
        
        # Step 2: Update index.html
        self.update_index_html(latest_report)
        
        # Step 3: Update main-report.html
        self.update_main_report_html(latest_report)
        
        # Step 4: Update branches.html (if exists)
        self.update_branches_html(latest_report)
        
        # Step 5: Show what to upload
        self.show_files_to_upload()
        
        print("\n" + "="*70)
        print("✅ UPDATE COMPLETE!")
        print("="*70)
        
        return True

# ============================================================================
# MAIN EXECUTION
# ============================================================================

if __name__ == "__main__":
    updater = ReportUpdater()
    updater.run()