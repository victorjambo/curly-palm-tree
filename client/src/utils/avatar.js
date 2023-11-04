import React, { useRef, useEffect } from "react";
import jazzicon from "@metamask/jazzicon";

/**
 * Jazz Icon component.
 * @param {Object} props
 * @param {number} [props.size = 10]
 * @param {string} props.username
 * @returns
 */
export default function Jazzicon({ size = 10, username }) {
  const divRef = useRef(null);
  const seed = username
    ? toPseudoRandomInteger(username)
    : Math.floor(100000 + Math.random() * 900000);
  const result = jazzicon(size, seed);

  useEffect(() => {
    if (!divRef || !divRef.current) return null;

    divRef.current.appendChild(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className="flex" ref={divRef} />;
}

function toPseudoRandomInteger(uidString = "") {
  var numberArray = [uidString.length];
  for (var i = 0; i < uidString.length; i++) {
    numberArray[i] = uidString.charCodeAt(i);
  }

  return numberArray.reduce((a, b) => a + b, 0);
}
