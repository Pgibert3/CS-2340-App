/**
 * @author Paul Gibert
 *
 * A boolean tree is a tree of nodes that satisfies the following rules:
 *      1) All nodes hold a data value and a boolean value
 *      2) The data value of each node is not inherently dependent on the
 *          values of other nodes
 *      3) the boolean value of a node is equal to
 *          childNode_0.boolean & childNode)1.boolean ... & childNode_n.boolean
 *
 * valid BooleanTree:
 *
 *           0
 *         /   \
 *        0     1
 *      / | \   | \
 *     0  1  1  1  1
 *
 * invalid BooleanTree
 *
 *           0
 *         /   \
 *        0     0 <-- Violation: child nodes evaluate to true, but parent is false
 *      / | \   | \
 *     0  1  1  1  1
 *
 * the data is an array of the form:
 *      [{id: id, value : value, bool : bool, children: [{}, {}, {}]}]
 */


export default class BooleanTree {
    constructor(data) {
        this.data = data;
    }

    /** Recursivly traverses the tree depth first */
    getNode(id) {
        function _searchLayer(id, layer) {
            let result = null
            for (node of layer) {
                if (node.id === id) {
                    //if a match is found return immediatly
                    return node;
                } else if (node.children.length > 0) {
                    //only update result if a match is found
                    let temp = _searchLayer(id, node.children);
                    result = (temp == null) ? result : temp;
                }
            }
            return result;
        }


        return _searchLayer(id, this.data);
    }

    /**
     * Fetches the parent of a node depth first.
     * Returns null if node has no parent.
     */
    getParent(id) {
        /**
         * Same implementation as _searchLayer from getNode() but keeps track
         * and returns parent aswell.
         */
        function _searchLayer(id, parent, layer) {
            let result = null;
            for (node of layer) {
                if (node.id === id) {
                    //if a match is found return parent immediatly
                    return [parent, node];
                } else if (node.children.length > 0) {
                    let temp = _searchLayer(id, node, node.children);
                    parent = (temp[1] == null) ? parent : temp[0];
                    result = (temp[1] == null) ? result : temp[1];
                }
            }

            return [parent, result];
        }


        return _searchLayer(id, null, this.data)[0];
    }

    /** applies the rules of the BooleanTree */
    balanceTree() {
        /** applies the rules of the BooleanTree to a single node */
        function _balanceNode(node) {
            if (node.children.length > 0) {
                node.bool = true;
                for (child of node.children) {
                    if (child.children.length > 0) {
                        _balanceNode(child);
                    }
                    node.bool = node.bool && child.bool;
                }
            } else {
                //bottom level node. Do not update bool
                return;
            }
        }

        for (node of this.data) {
            _balanceNode(node);
        }
    }

    /**
     * Sets the bool value of a node and balances the tree. When a node is
     * updated, the node's children must first be balanced. Afterwards the
     * entire tree is balanced. The tree is balanced this way to ensure the
     * rules of the BinaryTree are maintained and prevents the introduction
     * of nodes that cannot be balanced.
     */
    setNodeBool(id, bool) {
        /** sets the children of a node to its bool value */
        function _setChildren(node) {
            for (var child of node.children) {
                if (child.children.length > 0) {
                    _setChildren(child, node.bool);
                }
                child.bool = bool;
            }
        }

        let node = this.getNode(id);
        node.bool = bool;
        _setChildren(node);
        this.balanceTree();
        return this.getNode(id);
    }

    /** sets the value of a node */
    setNodeValue(id, value) {
        let node = this.getNode(id);
        node.value = value;
        return this.getNode(id);
    }

    /** Toggles the bool value of a node and balances */
    toggleNodeBool(id) {
        let node = this.getNode(id);
        this.setNodeBool(id, !node.bool);
        return this.getNode(id);
    }

    /** Returns the nested most children of a node that is bool */
    getLeavesByBool(id, bool) {
        let node = this.getNode(id);
        if (node.children.length == 0 && node.bool == bool) {
            return [node];
        } else {
            let leaves = [];
            for (var child of node.children) {
                leaves = leaves.concat(this.getLeavesByBool(child.id, bool));
            }
            return leaves;
        }
    }
}

export class node {
    constructor(id, value, bool, children) {
        //id must be unique in the tree
        this.id = id;
        this.value = value;
        this.bool = bool;
        this.children = children;
    }
}
