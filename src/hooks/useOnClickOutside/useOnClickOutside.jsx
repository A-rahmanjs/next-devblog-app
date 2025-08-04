import React from "react";
function useOnClickOutside(ref, callback) {
  React.useEffect(() => {
    function handleClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [ref, callback]);
}

export default useOnClickOutside;
