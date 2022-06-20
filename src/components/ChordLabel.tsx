import React, { useState, useEffect, useRef } from 'react';
import useStore from '../store/store';
import useOnClickOutside from 'use-onclickoutside';
import useOnKeyPress from '../hooks/useOnKeyPress';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

import { defaultSettings } from '../App';

const ChordLabel = () => {
  const wrapperDivRef = useRef<HTMLDivElement>(null);

  const { enabled, typed, styled } = useStore((state) => state.chordLabel);
  const setChordLabel = useStore((state) => state.setChordLabel);
  const toggleChordLabel = useStore((state) => state.toggleChordLabel);

  const [inputValue, setInputValue] = useState(typed);
  const [showInputField, setShowInputField] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    resetInputField();
  }, [enabled]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('submit');
    setChordLabel(inputValue);

    setShowInputField(false);

    if (inputValue === '') {
      toggleChordLabel();
    }
  };

  const onCancelHandler = () => {
    setShowInputField(false);
    resetInputField();
  };

  const resetInputField = () => {
    if (typed === '' || styled === '') {
      setChordLabel(defaultSettings.defaultChordLabel);
      setInputValue(defaultSettings.defaultChordLabel);
      return;
    }
    setInputValue(typed);
  };

  useOnKeyPress('Escape', () => onCancelHandler());
  useOnClickOutside(wrapperDivRef, () => onCancelHandler());

  return (
    <div
      ref={wrapperDivRef}
      className={`
        relative mx-auto mb-[0.25em]
        w-[62.5%] border-slate-700
        text-[9.5vw] font-bold md:text-7xl
      `}
    >
      <form onSubmit={onSubmitHandler}>
        <div
          className={`
            pointer-events-none absolute inset-0
            z-30 mx-auto
            flex w-full items-center justify-center
             bg-white
            pb-[0.333em] pt-[0.25em] 
            text-center leading-none
          `}
        >
          {styled}
        </div>
        <input
          type='text'
          className={`
            ${showInputField ? 'z-40' : 'z-20'}
            relative
            mx-auto
            block
            w-full rounded-xl
            border-0 bg-transparent
            bg-slate-200 pb-[0.333em] pt-[0.25em]
            text-center leading-none 
            shadow-inner outline-none
          `}
          value={inputValue}
          onClick={() => setShowInputField(true)}
          onChange={onChangeHandler}
        />
        <div
          className={`
            ${showInputField ? 'flex' : 'hidden'}
            absolute bottom-0
            left-0 right-0 z-40 translate-y-1/2 justify-center gap-2
          `}
        >
          <button
            type='button'
            className={`
              h-12 w-12
              overflow-hidden
              rounded-full bg-slate-200 p-1
            `}
            onClick={onCancelHandler}
          >
            <FaTimesCircle className='h-full w-auto fill-red-500' title='Cancel' />
          </button>
          <button
            type='submit'
            className={`
              h-12 w-12
              overflow-hidden
              rounded-full bg-slate-200 p-1
            `}
          >
            <FaCheckCircle className='h-full w-auto fill-green-600' title='Save Changes' />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChordLabel;
