/* eslint-disable eqeqeq */
//constructor represents one node in the tree
class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  //average case for insertion is LOGARITHMIC O(log(n))
  //more complex it goes to O(n)
  insert(key, value) {
    if (this.key == null) {
      this.key = key;
      this.value = value;
    } else if (key < this.key) {
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this);
      } else {
        this.left.insert(key, value);
      }
    } else {
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }


  //average time complexity of finding is O(log(n))
  //worst time complexity of finding is O(n)
  //best time complexity of finding is O(1)
  find(key) {
    if (this.key == key) {
      return this.value;
    } else if (key < this.key && this.left) {
      return this.left.find(key);
    } else if (key > this.key && this.right) {
      return this.right.find(key);
    } else {
      throw new Error('Key Error');
    }
  }

  remove(key) {
    if (this.key == key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      } else if (this.left) {
        this._replaceWith(this.left);
      } else if (this.right) {
        this._replaceWith(this.right);
      } else {
        this._replaceWith(null);
      }
    }
    else if (key < this.key && this.left) {
      this.left.remove(key);
    } else if (key > this.key && this.right) {
      this.right.remove(key);
    } else {
      throw new Error('Key Error');
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      } else if (this == this.parent.right) {
        this.parent.right = node;
      } if (node) {
        node.parent = this.parent;
      }
    }
    else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      } else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }



  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }

  _findMax() {
    if (!this.right) {
      return this;
    }
    return this.right._findMax();
  }
}


//problem 3
const bst = new BinarySearchTree();
bst.insert(3, 3);
bst.insert(1, 1);
bst.insert(4, 4);
bst.insert(6, 6);
bst.insert(9, 9);
bst.insert(2, 2);
bst.insert(5, 5);
bst.insert(7, 7);
console.log(bst);

//problem 4 is recursively summing up the initial parameter(root node possibly?) with its left and right values

function findHeight(tree) {
  let leftHeight = 0;
  let rightHeight = 0;
  if (!tree) {
    return 0;
  }
  if (!tree.left && !tree.right) {
    return 1;
  }
  if (tree.left) {
    leftHeight = findHeight(tree.left);
  }
  if (tree.right) {
    rightHeight = findHeight(tree.right);
  }
  return Math.max(leftHeight, rightHeight) + 1;
}
//time complexity is O(n)

function determineBST(tree) {
  if (!tree) {
    return false;
  }
  if (tree.left) {
    if (tree.left.value > tree.value) {
      return false;
    } else 
      return determineBST(tree.left);
  }
  if (tree.right) {
    if (tree.right.value < tree.value) {
      return false;
    } else 
      return determineBST(tree.right);
  }
  return true;
}


///problem 7 find 3rd largest number in bst
function thirdBiggest(tree) {
  tree.remove(tree._findMax().key);
  tree.remove(tree._findMax().key);
  return (tree._findMax().key);
}

//problem 8 write an algorithm to check if a BST is balanced
function isItBalanced(tree) {
  let leftPoint = 0;
  let rightPoint = 0;
  let pos = tree;
  while (pos.left !== null) {
    pos = pos.left;
    leftPoint++;
  }
  pos = tree;
  while (pos.right !== null) {
    pos = pos.right;
    rightPoint++;
  }
  return rightPoint - leftPoint < 1 && leftPoint - rightPoint < 1;
}

