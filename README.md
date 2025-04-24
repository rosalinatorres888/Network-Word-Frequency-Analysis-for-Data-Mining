
## Network & Word Frequency Analysis

**Author**: Rosalina Torres  
**Program**: M.S. Data Analytics Engineering @ Northeastern University  
**Focus**: Keyword Co-occurrence, Network Graphs, and Frequency Insights  
**Tools**: Python, NLTK, NetworkX, Matplotlib, Pandas

---

## 🔍 Keyword Network Graph from Academic Abstracts

This project transforms raw academic keyword metadata into a structured, semantic network graph. Designed to reveal the hidden architecture of thematic clusters and conceptual interrelations, the pipeline demonstrates how textual signals can be shaped into relational insights using foundational data wrangling and graph analytics techniques.

---

## 🚀 Project Objective

To build a weighted, undirected graph from academic article keywords, where:

- **Nodes** represent unique keywords.
- **Edges** reflect co-occurrence frequency within the same article.
- **Edge Weights** quantify the strength of each semantic relationship.

---

## 🛠️ Methodology Overview

### 1. **Data Cleaning & Preprocessing**
- Lowercasing, punctuation removal, and whitespace normalization.
- Preservation of multi-word academic phrases (e.g., *corporate governance*).
- Removal of English stopwords.
- Filtering out rows with missing or non-informative keyword data.

### 2. **Keyword Extraction & Transformation**
- Keywords for each article are isolated, cleaned, and converted into list format.
- These keyword lists are used to generate co-occurrence pairs.

### 3. **Modeling Semantic Relationships**
- Construction of a co-occurrence dictionary using unique keyword pairs.
- Generation of a symmetric, zero-diagonal adjacency matrix to quantify relationships.

### 4. **Network Graph Construction**
- Creation of a weighted, undirected graph using NetworkX.
- Edge weights reflect the frequency of keyword co-occurrences.
- The resulting graph visually and analytically reveals central themes and keyword connectivity.

---

## 📊 Technologies Used

- **Python** (Pandas, NetworkX, Matplotlib, NLTK)
- **Jupyter Notebook** for step-by-step exploration
- **Data Source**: Academic articles keyword metadata (`Keyword_data.csv`)

---

## 📁 Repository Structure

articles-dataset/
├── DataMiningProject.ipynb      # Main notebook with all analysis
├── Keyword_data.csv             # Dataset used in the project
├── README.md                    # This file

---

## 🔮 Insights

- Central keywords emerge as hubs, indicating thematic importance.
- Clusters of co-occurring terms suggest natural topic groupings.
- The graph structure reveals not just frequency—but **relationship strength** between academic concepts.

---

## 📚 Applications

This approach is foundational for:
- Topic modeling and curriculum analysis
- Knowledge mapping in literature reviews
- Graph-based machine learning pipelines

---

## ✨ Author  
**Rosalina Torres**  
M.S. in Data Analytics Engineering Candidate  
College of Engineering, Northeastern University  

---

## 📬 Contact

- 📧 [rosalina7torres@gmail.com](mailto:rosalina7torres@gmail.com)  
- 🔗 [LinkedIn](https://www.linkedin.com/in/rosalina2)

---

## 💡 Acknowledgments

A beginner's mind in the world of data engineering.
