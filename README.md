
# 🧠 Network & Word Frequency Analysis for Data Mining

**Author:** Rosalina Torres  
**Program:** M.S. Data Analytics Engineering, Northeastern University  
**Focus:** Keyword Co-occurrence | Network Graphs | Frequency Insights  
**Tools:** Python | NLTK | NetworkX | Pandas | Matplotlib

---

## 📌 Overview

This project applies network science and text mining to uncover semantic relationships within a dataset of academic article metadata. By modeling co-occurrence patterns among keywords, I identified emergent themes, semantic bridges, and topic centrality. The result is a network graph where:
- **Nodes** = individual keywords  
- **Edges** = frequency of co-occurrence  
- **Edge Weights** = strength of keyword connection

This project demonstrates how data mining and visualization can enhance content discovery, research mapping, and thematic analysis.

---

## 🎯 Objective

Construct a weighted, undirected graph that reveals latent thematic structures by:
- Representing keywords as nodes
- Connecting co-occurring keywords within the same article
- Quantifying edge strength based on frequency

---

## 🔍 Methodology

1. **Data Preprocessing**
   - Lowercasing and punctuation removal
   - Preservation of multi-word academic terms (e.g., “corporate governance”)
   - Removal of stopwords and null entries

2. **Keyword Pair Extraction**
   - Converted raw keyword strings into cleaned lists
   - Generated unique co-occurrence pairs for each article

3. **Adjacency Matrix Construction**
   - Built a symmetric co-occurrence matrix
   - Diagonal set to zero to remove self-loops

4. **Network Graph Modeling**
   - Created a weighted, undirected graph using NetworkX
   - Computed centrality metrics:
     - Degree (keyword frequency)
     - Weighted Degree (semantic reach)
   - Visualized themes using force-directed layouts

---

## 🧪 Tools & Technologies

- Python: Pandas, NetworkX, NLTK, Matplotlib
- Jupyter Notebook: Interactive analysis
- Data Source: Keyword_data.csv – academic metadata

---

## 📁 Repository Structure

```
articles-dataset/
├── DataMiningProject.ipynb      # Full analysis workflow
├── Keyword_data.csv             # Raw keyword metadata
└── README.md                    # Project overview and guide
```

---

## 📈 Use Cases

### Technical Applications
- Topic Modeling – Identify dominant themes
- Information Retrieval – Improve tagging and classification
- Domain Mapping – Visualize topic clusters

### Business Applications
- Content Strategy – Surface trending academic keywords
- Innovation Mapping – Spot whitespace and new research frontiers
- Search Optimization – Improve discoverability

---

## 🌟 Skills Demonstrated

- Text Preprocessing & NLP
- Graph Theory & Network Modeling
- Data Visualization
- Technical Storytelling

---

## 👩‍💻 About the Author

**Rosalina Torres**  
M.S. in Data Analytics Engineering Candidate  
Northeastern University – College of Engineering  
📬 rosalina7torres@gmail.com  
🔗 LinkedIn Profile

---

## 🤝 Acknowledgments

“A beginner’s mind in the world of data engineering, with a purpose to make meaning through structure and insight.”
