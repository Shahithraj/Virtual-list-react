import React, { useEffect, useRef, useState } from 'react';

const VirtualScroll = ({ list }) => {
  const virtualRef = useRef(null);
  const [listHeight, setListHeight] = useState(0);
  const [listToRender, setListToRender] = useState({ start: 0, end: 1 });
  const buffer = 5;
  useEffect(() => {
    const listHeight = virtualRef?.current?.children[0].offsetHeight;
    setListHeight(listHeight);
    virtualRef.current?.setAttribute(
      'style',
      `height:${listHeight * list.length}px`
    );
    calculateListToRender();
    // virtualRef.current.style.height = list * listHeight + 'px';
  }, []);

  const calculateListToRender = () => {
    const scrollPosition = virtualRef?.current?.parentElement.scrollTop;
    const containerHeight = virtualRef.current.parentElement.offsetHeight;
    const listHeight = virtualRef?.current?.children[0].offsetHeight;
    const startIndex = Math.max(0, Math.floor(scrollPosition / listHeight));
    const endIndex = Math.min(
      list.length - 1,
      Math.ceil((scrollPosition + containerHeight) / listHeight)
    );
    const index = {
      start: startIndex,
      end: endIndex,
    };
    console.log(index);
    setListToRender(index);
  };

  const calculateTop = (i) => {
    // if (i % 2 == 0) {
    return (listToRender.start + i) * listHeight;
    // } else {
    //   return (listToRender.start + i - 1) * listHeight;
    // }
  };

  const calculateLeft = (i) => {
    if (i % 2 == 0) {
      return 0;
    } else {
      return '50%';
    }
  };

  return (
    <div
      ref={virtualRef}
      className="virtual-scrollable"
      onWheel={calculateListToRender}
    >
      {list.length > 0 &&
        list.slice(listToRender.start, listToRender.end).map((item, i) => (
          <div
            style={{
              '--top': calculateTop(i) + 'px',
              // '--left': calculateLeft(i),
            }}
            className="virtualized-list"
          >
            {item}{' '}
          </div>
        ))}
    </div>
  );
};

export default VirtualScroll;
