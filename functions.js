import { Node } from './classes.js';

function buildTree(nums) {
    if (nums.length <= 0) return null;

    const arr = [...new Set(nums)].sort((a, b) => a - b);

    const mid = Math.floor((arr.length - 1) / 2);

    const root = new Node(arr[mid]);

    const leftArr = arr.slice(0, mid);
    const rightArr = arr.slice(mid + 1);

    root.left = buildTree(leftArr);
    root.right = buildTree(rightArr);

    return root;
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
};

function randomNums(length, maxVal) {
    let arr = [];

    while (arr.length < length) {
        const randomNum = Math.floor(Math.random() * maxVal);
        arr.push(randomNum);
    }

    return arr;
}

export { buildTree, prettyPrint, randomNums };
