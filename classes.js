import { buildTree } from './functions.js';

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arr) {
        this.root = buildTree(arr);
    }

    insert(value) {
        let currentNode = this.root;

        while (true) {
            if (value < currentNode.data) {
                if (currentNode.left === null) {
                    currentNode.left = new Node(value);
                    break;
                }

                currentNode = currentNode.left;
            } else if (value > currentNode.data) {
                if (currentNode.right === null) {
                    currentNode.right = new Node(value);
                    break;
                }

                currentNode = currentNode.right;
            } else {
                break;
            }
        }
    }

    deleteItem(value) {
        let currentNode = this.root;
        let previousNode = null;

        while (currentNode != null && currentNode.data != value) {
            previousNode = currentNode;
            if (value < currentNode.data) {
                currentNode = currentNode.left;
            } else {
                currentNode = currentNode.right;
            }
        }

        if (currentNode === null) {
            return;
        }

        if (currentNode.left === null && currentNode.right === null) {
            if (currentNode === this.root) {
                this.root = null;
            }
            if (previousNode.left === currentNode) {
                previousNode.left = null;
            } else {
                previousNode.right = null;
            }
        } else if (currentNode.left === null || currentNode.right === null) {
            let nextNode =
                currentNode.left === null
                    ? currentNode.right
                    : currentNode.left;

            if (previousNode.left === currentNode) {
                previousNode.left = nextNode;
            } else {
                previousNode.right = nextNode;
            }
        } else {
            let nextParent = currentNode;
            let nextNode = currentNode.right;

            while (nextNode.left != null) {
                nextParent = nextNode;
                nextNode = nextNode.left;
            }

            currentNode.data = nextNode.data;

            if (nextParent.left === nextNode) {
                nextParent.left = nextNode.right;
            } else {
                nextParent.right = nextNode.right;
            }
        }
    }

    find(value) {
        let currentNode = this.root;

        while (currentNode != null) {
            if (value < currentNode.data) {
                currentNode = currentNode.left;
            } else if (value > currentNode.data) {
                currentNode = currentNode.right;
            } else {
                return currentNode;
            }
        }

        return null;
    }

    levelOrder(callback) {
        if (typeof callback != 'function') {
            throw new Error('You need a callback function!');
        }

        if (!this.root) {
            return;
        }

        let queue = [];
        queue.push(this.root);

        while (queue.length > 0) {
            const currentNode = queue.shift();
            callback(currentNode);

            if (currentNode.left) {
                queue.push(currentNode.left);
            }

            if (currentNode.right) {
                queue.push(currentNode.right);
            }
        }
    }

    traverse(node, callback, order) {
        if (!node) return;

        if (order === 'pre') callback(node);
        this.traverse(node.left, callback, order);
        if (order === 'in') callback(node);
        this.traverse(node.right, callback, order);
        if (order === 'post') callback(node);
    }

    inOrder(callback) {
        if (typeof callback != 'function') {
            throw new Error('You need a callback function!');
        }

        this.traverse(this.root, callback, 'in');
    }

    preOrder(callback) {
        if (typeof callback != 'function') {
            throw new Error('You need a callback function!');
        }

        this.traverse(this.root, callback, 'pre');
    }

    postOrder(callback) {
        if (typeof callback != 'function') {
            throw new Error('You need a callback function!');
        }

        this.traverse(this.root, callback, 'post');
    }

    height(node) {
        if (!node) return null;

        const left = this.height(node.left);
        const right = this.height(node.right);

        return 1 + Math.max(left, right);
    }

    depth(node, currentNode = this.root) {
        if (!currentNode) return -1;

        let depth = 0;

        if (currentNode === node) {
            return 0;
        }

        const left = this.depth(node, currentNode.left);
        if (left >= 0) {
            return left + 1;
        }

        const right = this.depth(node, currentNode.right);
        if (right >= 0) {
            return right + 1;
        }
    }

    isBalanced() {
        const checkBalance = (node) => {
            if (!node) return true; // Un albero vuoto è bilanciato

            const left = this.height(node.left);
            const right = this.height(node.right);

            const heightDiff = Math.abs(left - right);

            if (heightDiff > 1) {
                return false;
            } else {
                // Ricorsione sui sottoalberi sinistro e destro
                return checkBalance(node.left) && checkBalance(node.right);
            }
        };

        return checkBalance(this.root);
    }

    rebalance() {
        let newArr = [];
        this.inOrder((node) => newArr.push(node.data));
        this.root = buildTree(newArr);
    }
}

export { Node, Tree };
