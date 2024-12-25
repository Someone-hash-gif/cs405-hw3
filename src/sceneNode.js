/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    draw(mvp, modelView, normalMatrix, modelMatrix) {
        var transform = this.trs.getTransformationMatrix();
        let transformedMvp = MatrixMult(mvp, transform);
        let transformedModelView = MatrixMult(modelView, transform);
        let transformedModel = MatrixMult(modelMatrix, transform);
        let transformedNormals = getNormalMatrix(modelView);

        if (this.children == []) {
            
        } else {
            this.children.forEach(child => {
                child.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
            });
        }

        // Draw the MeshDrawer
        if (this.meshDrawer) {
            console.log("Drawing mesh: ", this);
            this.meshDrawer.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        }
    }

    

}