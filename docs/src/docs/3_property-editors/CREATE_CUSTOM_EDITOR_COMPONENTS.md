---
path: "/create-custom-editor-components"
title: Create custom editor component
section: Property Editors
order: 4
---

You can create a custom editor component using react.

It takes in props as generic type: 'PropertyEditorProps<T>'. In this example T is 'number', this means that it can only be applied to entity properties of type number.

Inside this component, you have access to props.value & props.setValue. NB props.value can be undefined, so this case needs to be handled.

## Create custom editor component

_CustomDropdownEditor.tsx_

```tsx
import React from "react";
import { PropertyEditorProps } from "@refract-cms/core";
import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  highlightedText: {
    color: theme.palette.secondary.main,
    fontWeight: 500
  }
}));

export default ({ value, setValue }: PropertyEditorProps<number>) => {
  const classes = useStyles();
  return (
    <div>
      <Typography className={classes.highlightedText} gutterBottom>
        This is an example of using current theme to render text with secondary
        color.
      </Typography>
      <select
        value={value}
        onChange={e => setValue(parseInt(e.target.value, 10))}
      >
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </select>
    </div>
  );
};
```

## Usage

```typescript
import { composeSchema, Entity } from "@refract-cms/core";
import CustomDropdownEditor from "./CustomDropdownEditor";

export const MySchema = composeSchema({
  options: {
    // ... schema options omitted for brevity
  },
  properties: {
    customNumber: {
      displayName: "Custom number",
      defaultValue: 3,
      editorComponent: CustomDropdownEditor,
      type: Number
    }
  }
});
```
