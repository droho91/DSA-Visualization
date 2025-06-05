export default class BinaryTreeVisualization {
  constructor(container, { root }) {
    this.container = container;
    this.root = root;
    this.nodeRadius = 24;
    this.levelHeight = 80;
    this.siblingGap = 40;
    this.animationSpeed = 500; // ms

    this.nodes = [];
    this.links = [];

    this.calculatePositions(this.root, 0, 0);
    this.render();
  }

  calculatePositions(node, depth, offset) {
    if (!node) return 0;

    const leftWidth = this.calculatePositions(node.left, depth + 1, offset);
    const x = offset + leftWidth;
    const y = depth * this.levelHeight;

    const rightWidth = this.calculatePositions(node.right, depth + 1, x + this.siblingGap);

    this.nodes.push({ value: node.value, x, y });

    if (node.left) {
      const leftChild = this.nodes.find(n => n.value === node.left.value);
      this.links.push({ from: { x, y }, to: { x: leftChild.x, y: leftChild.y } });
    }

    if (node.right) {
      const rightChild = this.nodes.find(n => n.value === node.right.value);
      this.links.push({ from: { x, y }, to: { x: rightChild.x, y: rightChild.y } });
    }

    return leftWidth + this.siblingGap + rightWidth;
  }

  render() {
    this.container.innerHTML = '';

    const minX = Math.min(...this.nodes.map(node => node.x));
    const maxX = Math.max(...this.nodes.map(node => node.x));
    const treeWidth = maxX - minX;

    const svgWidth = treeWidth + 200;
    const svgHeight = 500;
    const offsetX = (svgWidth - treeWidth) / 2 - minX;

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", svgHeight);
    svg.setAttribute("viewBox", `0 0 ${svgWidth} ${svgHeight}`);

    this.links.forEach(link => {
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", link.from.x + offsetX);
      line.setAttribute("y1", link.from.y + 40);
      line.setAttribute("x2", link.to.x + offsetX);
      line.setAttribute("y2", link.to.y + 40);
      line.setAttribute("stroke", "#ccc");
      line.setAttribute("stroke-width", "2");
      svg.appendChild(line);
    });

    this.nodes.forEach(node => {
      const cx = node.x + offsetX;
      const cy = node.y + 40;

      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", cx);
      circle.setAttribute("cy", cy);
      circle.setAttribute("r", this.nodeRadius);
      circle.setAttribute("fill", "#3b82f6");
      circle.setAttribute("stroke", "#2563eb");
      circle.setAttribute("stroke-width", "2");
      circle.classList.add(`node-${node.value}`);
      svg.appendChild(circle);

      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", cx);
      text.setAttribute("y", cy + 5);
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("fill", "#fff");
      text.textContent = node.value;
      svg.appendChild(text);
    });

    this.container.appendChild(svg);
  }

  async traverse(type) {
    const nodes = [];
    const traverseFunc = {
      preorder: this.preOrderTraversal.bind(this),
      inorder: this.inOrderTraversal.bind(this),
      postorder: this.postOrderTraversal.bind(this)
    }[type];

    if (!traverseFunc) return;

    traverseFunc(this.root, nodes);

    for (const node of nodes) {
      const circle = this.container.querySelector(`.node-${node.value}`);
      if (circle) {
        circle.setAttribute("fill", "#f59e42");
        await new Promise(resolve => setTimeout(resolve, this.animationSpeed));
        circle.setAttribute("fill", "#3b82f6");
      }
    }
  }

  preOrderTraversal(node, result) {
    if (!node) return;
    result.push(node);
    this.preOrderTraversal(node.left, result);
    this.preOrderTraversal(node.right, result);
  }

  inOrderTraversal(node, result) {
    if (!node) return;
    this.inOrderTraversal(node.left, result);
    result.push(node);
    this.inOrderTraversal(node.right, result);
  }

  postOrderTraversal(node, result) {
    if (!node) return;
    this.postOrderTraversal(node.left, result);
    this.postOrderTraversal(node.right, result);
    result.push(node);
  }
}