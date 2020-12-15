---
path: "/create-schema-config"
title: Create schema config
section: Schema config
order: 2
---

# Setup Refract-CMS Schema config

Create file: `blog-post.schema.tsx`

```tsx
import {
  composeSchema,
  createTextEditor,
  createDatePickerEditor,
  propertyBuilder
} from "@refract-cms/core";
import DescriptionIcon from "@material-ui/icons/Description";

export const BlogPostSchema = composeSchema({
  options: {
    alias: "blogPost",
    displayName: "Blog post",
    icon: DescriptionIcon,
    instanceDisplayProps: blogPost => ({
      primaryText: blogPost.title
    })
  },
  properties: {
    title: {
      displayName: "Title",
      editorComponent: createTextEditor(),
      type: String
    },
    date: {
      displayName: "Date",
      editorComponent: createDatePickerEditor(),
      type: Date
    }
  }
});
```

-- refract-config.ts

Add your new schema to the refract-config.

```typescript
...
import { BlogPostSchema } from "./news-article.schema";

export default configure({
  schema: [
    BlogPostSchema
    // The rest of your schemas
  ]
});
```
