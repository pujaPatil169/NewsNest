import { styled } from '@mui/material/styles';

//here in styled you can either pass mui components or custom components or html elements
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: '1px',
  cursor: 'pointer'
});

export { VisuallyHiddenInput };