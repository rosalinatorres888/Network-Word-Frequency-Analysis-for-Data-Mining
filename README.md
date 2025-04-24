
## Network & Word Frequency Analysis for Data Mining

**Author**: Rosalina Torres  
**Program**: M.S. Data Analytics Engineering @ Northeastern University  
**Focus**: Keyword Co-occurrence, Network Graphs, and Frequency Insights  
**Tools**: Python, NLTK, NetworkX, Matplotlib, Pandas

---

## Overview

This project explores keyword co-occurrence patterns within a dataset of academic article metadata. The primary objective is to identify how keywords cluster around shared themes and which terms act as central connectors across topics. Using network analysis techniques, I constructed a graph with nodes representing individual keywords and weighted edges indicating their frequency of co-occurrence. Key metrics such as node degree and strength were computed to quantify keyword influence and thematic reach. The analysis provides insight into how concepts are interlinked, highlighting both broadly connected topics and specific, high-impact terms.

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

Insights derived from this project support a range of technical and business applications, including:

## **Technical Applications**
- **Topic Modeling** – Identify dominant and latent themes across documents.  
- **Information Retrieval** – Enhance search relevance and keyword tagging.  
- **Text Summarization** – Distill key ideas and domain-specific concepts.  
- **Domain Analysis** – Extract recurring patterns and terminology in specialized fields.

## **Business Applications**
- **Content Strategy** – Inform editorial and SEO strategies by surfacing trending themes.  
- **Research Intelligence** – Detect emerging topics and whitespace in academic or technical domains.  
- **Product Positioning** – Identify language used around key concepts to fine-tune messaging.  
- **Innovation Mapping** – Spot opportunity areas and knowledge clusters for R&D planning.  
- **Academic Search Optimization** – Improve indexing, discoverability, and recommendation systems.

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
