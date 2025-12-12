import { useRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";

export default function ResultModal({ reference, remainingTime, targetTime, onReset }) {
    const dialog = useRef();

    const userLost = remainingTime <= 0;
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);
    useImperativeHandle(reference, () => {
        return {
            //user defined method
            open() {
                dialog.current.showModal();
            }
        }
    });// define properties and methods accssible from outside this component. not used often 
    return createPortal (
        <dialog ref={dialog} className="result-modal" onClose={onReset}>
            {userLost && <h2>You lost </h2>}
            {!userLost && <h2>Your score: {score}</h2>}
            <p>The target time was <strong>{targetTime} seconds.</strong></p>
            <p>You stopped the timer with <strong>{formattedRemainingTime} seconds</strong></p>

            <form method="dialog" onSubmit={onReset}>
                <button>Close</button>
                {/* will automatically close the dialog */}
            </form>
        </dialog>,
        document.getElementById('modal')
    );
}