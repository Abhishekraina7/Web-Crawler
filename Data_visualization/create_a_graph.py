import networkx as nx
import matplotlib.pyplot as plt
import pandas as pd

# Load the data from the CSV file
df = pd.read_csv("report.csv")
print(df.head())

# Create a list of URLs and their corresponding counts
urls = df['URL'].tolist()
count = df[' Count'].tolist()




# 1. Create a directed graph
G = nx.DiGraph()

# Add nodes with their counts as a node attribute
for url, count in zip(urls, count):
    G.add_node(url, size=count)  # Add node with size attribute based on count


# 2.Visualize the graph


# 2.a Get node sizes based on the counts
node_sizes = [G.nodes[node]['size'] * 400 for node in G.nodes]  # Scale sizes for visibility

# 2.b Create a layout for the graph
pos = nx.spring_layout(G,k = 2)

# 2.c Draw the graph
plt.figure(figsize=(15, 10)) 
nx.draw_networkx_nodes(G, pos, node_size=node_sizes, alpha=0.7)
nx.draw_networkx_labels(G, pos)
plt.title("Internal Link Counts Visualization")
plt.axis("On")  # Turn off the axis
plt.show()  # Display the graph