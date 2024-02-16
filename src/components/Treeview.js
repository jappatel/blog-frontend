
import { useState } from "react";


const TreeNode = ({node}) => {
    const [isOpen ,setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="tree-node ">
        <div className="node-content flex items-center bg-slate-100" onClick={toggle}>
            {node.children && (
                <span className="toggle-icon mr-2 ">{isOpen ? '-' : '+'}</span>
            )}
            <span>{node.name}</span>
        </div>
        {isOpen && node.children && (
            <div className="child-nodes ml-4">
                {node.children.map(childNode => (
                    <TreeNode key={childNode.id} node={childNode} />
                ))}
            </div>
        )}
    </div>
    );
}




const TreeView = ({data}) => {
    return ( 
    <div className="tree-view  tree-view w-64 h-80 overflow-auto border border-gray-300 rounded">

        {data.map((node)=>(
            <TreeNode key={node.id} node={node} />
        ))}
    </div>
    );
};


export default TreeView