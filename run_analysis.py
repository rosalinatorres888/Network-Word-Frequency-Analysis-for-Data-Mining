#!/usr/bin/env python
"""
Network Word Frequency Analysis - Main Script
Run the complete analysis pipeline
"""

import subprocess
import sys

def main():
    print("Starting Network Word Frequency Analysis...")
    print("-" * 50)
    
    # Run the Jupyter notebook
    try:
        subprocess.run([
            sys.executable, "-m", "jupyter", "nbconvert", 
            "--to", "notebook", "--execute", 
            "--output", "DataMiningProject_executed.ipynb",
            "DataMiningProject.ipynb"
        ], check=True)
        print("✓ Analysis complete! Check outputs/visualizations/ for results")
    except subprocess.CalledProcessError:
        print("✗ Error running analysis. Please check DataMiningProject.ipynb")

if __name__ == "__main__":
    main()
