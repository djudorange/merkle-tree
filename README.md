# Merkle Tree

Usage:
```
const createMerkleTree = require('MerkleTree');
let merkle = createMerkleTree(["data1", "data2"]);
```

### Methods

MerkleTree.root

```
merkle.root() //=> get the merkle root
```

MerkleTree.height
```
merkle.height() //=> get the number of level
```

MerkleTree.level
```
merkle.level(2) // => get all hash of level 2
```