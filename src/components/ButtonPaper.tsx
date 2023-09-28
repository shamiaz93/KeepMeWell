// Packages Imports
import * as React from 'react';
import { Button } from 'react-native-paper';

// Type for CustomButton
type CustomButtonProps = {
  title: string;
} & React.ComponentProps<typeof Button>;

// function component for CustomButton
const ButtonPaper: React.FC<CustomButtonProps> = ({ title, ...props }) => {
  return (
    <Button mode="contained" {...props}>
      {title}
    </Button>
  );
};

// Exports
export default ButtonPaper;
