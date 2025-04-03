import { useEffect } from "react";

function useDisableBack() {
  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
      window.history.go(1);
    };
  }, []);

  return;
}

export default useDisableBack;
