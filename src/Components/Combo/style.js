import css from 'styled-components';
import check from '../../icons/check.svg';
import close from '../../icons/close.svg';
import down from '../../icons/down-arrow.svg';

const killStyle = {
  position: 'absolute',
  top: '0px',
  left: '0px',
  height: '100%',
  width: '100%',
  zIndex: '-1',
}

const Select = css.div`
  position: relative;
  border: black solid 1px;
  display: inline-block;
  height: auto;
  width: auto;
  min-width: 200px;
  color: white;
  padding: 6px;
  :hover {
    cursor: pointer;
    background-color: #f2f2f2;
  }
  > span {
    color: black;
  }
`;

const Listbox = css.ul`
  position: absolute;
  height: 200px;
  min-width: 212px;
  background-color: white;
  overflow-y: scroll;
  padding: 0;
  top: 27px;
  border: 1px solid black;

  overflow-x: auto;
  &::-webkit-scrollbar {
    width:8px;
    margin-left: 10px;
  }

  &::-webkit-scrollbar-corner {
    display:none;
  }

  &::-webkit-scrollbar-button {
    display:none;
  }

  &::-webkit-scrollbar-thumb {
    position:absolute;
    background-color: #9b9b9b;
  }

`;

const Checkbox = css.li`

  position: relative;
  display: block;

  input {
    appearance: none;
    position: absolute;
    border: 1px solid black;
    height: 18px;
    width: 18px;
    top: 4px;
    left: 4px;
    z-index: 2;

    :hover {
      cursor: pointer;
    }

    :checked {
      :after {
        content: '';
        position: absolute;
        left: 1px;
        top: 1px;
        height: 14px;
        width: 14px;
        mask-image: url(${ check });
        mask-repeat: no-repeat;
        mask-size: contain;
        mask-position: center;
        background-color:black;
      }
    }
  }

  label {
    position: relative;
    display: block;
    padding: 6px 6px 6px 36px;
    z-index: 1;
    :hover {
      cursor: pointer;
      background-color: #f2f2f2;
    }
  }

  input:focus + label {
    background-color: #f2f2f2;
  }
`;

const SaveButton = css.button`
  appearance: none;
  height: 16px;
  width: 16px;
  margin-right: 4px;
  mask-image: url(${ check });
  mask-repeat: no-repeat;
  mask-size: contain;
  mask-position: center;
  background-color:black;
  &:hover {
    cursor: pointer;
  }
`;

const RejectButton = css(SaveButton)`
  mask-image: url(${ close });
`;

const Down = css.div`
  mask-image: url(${ down });
  mask-repeat: no-repeat;
  mask-size: contain;
  mask-position: center;
  background-color:black;
  height: 16px;
  width: 16px;
  margin-top: 2px;
`;

export {
  killStyle,
  Select,
  Listbox,
  Checkbox,
  SaveButton,
  RejectButton,
  Down,
};