---
path: "/plugin-file-system-image"
title: File System Image Plugin
section: Plugins
order: 6
---

This will allow you to upload images & pick them from your schemas. It adds has a image processor to your server and the ability to query for cropped images in GraphQL.

### Installation

```
npm install --save @refract-cms/plugin-file-system-image
```

Add Schema to your `refract.config.tsx`

```tsx
import { FileSystemImageSchema } from "@refract-cms/plugin-file-system-image";
// ... rest of imports

export default configureCli({
  schema: [
    // rest of your schemas
    FileSystemImageSchema
  ]
  // ... rest of config
});
```

Add server plugin to `server.config.ts`

```tsx
import { fileSystemImageServerPlugin } from "@refract-cms/plugin-file-system-image/dist/server";

export default configureCliServer({
  // rest of config
  plugins: [
    // rest of your plugins
    fileSystemImageServerPlugin({
      filesPath: "files/" // path is relative to root dir containing package.json
    })
  ]
});
```

In your schema you then add a reference to `FileSystemImageSchema`

```tsx
{
  image: propertyBuilder.singleReference(FileSystemImageSchema, {
    displayName: "Image"
  });
}
```

or

```tsx
{
  image: propertyBuilder.multipleReference(FileSystemImageSchema, {
    displayName: "Image"
  });
}
```
