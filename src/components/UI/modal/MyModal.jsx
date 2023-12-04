import React from 'react';
import modal from './MyModal.module.css'

const MyModal = ({children, visible, setVisible}) => {

    const rootClasses = [modal.myModal]
    if(visible){
        rootClasses.push(modal.active)
    }


    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)} >
            <div className={modal.myModalContent} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default MyModal;