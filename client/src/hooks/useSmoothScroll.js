import { useEffect } from "react";

export const useSmoothScroll = ({ len, ref }) => {
  useEffect(() => {
    if (len) {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [len, ref]);
};
