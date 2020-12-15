---
path: "/built-in-editor-components"
title: Built in editor components
section: Property Editors
order: 3
---

@refract-cms/core comes with built-in editor components for the basic input types:

## Text editor

```typescript
import { createTextEditor } from '@refract-cms/core';

properties: {
  ...
  myProperty: {
    displayName: 'My property',
    editorComponent: createTextEditor({
      maxLength: 30
    }),
    defaultValue: '',
    type: String
  }
}
```

## Date picker editor

```typescript
import { createDatePickerEditor } from '@refract-cms/core';

properties: {
  ...
  myProperty: {
    displayName: 'My property',
    editorComponent: createDatePickerEditor(),
    type: Date
  }
}

```

## Image Picker Editor

## Single Dropdown Editor

## Multiple Dropdown Editor

## Multiple Entity Picker Editor

## Single Entity Picker Editor

## List Editor

## File Upload Editor
