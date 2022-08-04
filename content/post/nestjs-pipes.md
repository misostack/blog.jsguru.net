---
title: "Nestjs Pipes"
type: "post"
date: 2022-08-04T10:46:09+07:00
description: "Nest interposes a pipe just before a method is invoked, and the pipe receives the arguments destined for the method and operates on them"
keywords: ["nestjs", "dto", "validation"]
categories: ["frameworks"]
tags: ["nestjs"]
image: "https://user-images.githubusercontent.com/31009750/181449337-70081a76-5a01-4229-805e-39ed0ded6b5b.png"
---

As you've known, in a request we will have:

- Route Params ( included in URL )
- Query Params ( included in URL )
- Body ( json/form-data/multipart/form-data )

> There are 2 ways to get these values

### Library specific Approach - Express

```ts
import { Controller, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";

@Controller("examples")
export class ExamplesController {
  @Post("request-object/express/:email")
  exampleRequestObjectExpress(@Req() req: Request, @Res() res: Response) {
    const responseData = {
      approach: "express",
      routeParams: req.params,
      queryParams: req.query,
      body: req.body,
      headers: req.headers,
      ip: req.ip,
      ips: req.ips,
      hostname: req.hostname,
      subdomain: req.subdomains,
    };
    res.status(200).json(responseData);
  }
}
```

### Standard using NestJS Decoratos

```ts
import {
  Controller,
  Delete,
  Get,
  Headers,
  Ip,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
} from "@nestjs/common";
import { Body } from "@nestjs/common";
import { Request, Response } from "express";

@Controller("examples")
export class ExamplesController {
  @Post("request-object/standard/:email")
  exampleRequestObjectStandard(
    @Body() body,
    @Query() query,
    @Param("email") email: string,
    @Headers() headers,
    @Ip() ip
  ) {
    const responseData = {
      approach: "standard",
      routeParams: { email },
      queryParams: query,
      body: body,
      headers: headers,
      ip,
    };
    return responseData;
  }
}
```

**It's more clean right? We only have to work with JSON object, NestJS will do serialization part for us**

### But how about uploading files with form-data/multipart?

![image](https://user-images.githubusercontent.com/31009750/182763620-ac27e35a-5a4b-4d3f-9153-0fc98c22c199.png)

**Let's have a look in POST data when a request is trying to upload a file**

![image](https://user-images.githubusercontent.com/31009750/182764168-96dd74f6-0297-47e5-9bb9-56f1c39321f3.png)

> Request is a streaming object

![image](https://user-images.githubusercontent.com/31009750/182773536-4edb3c95-520d-4afc-bf8f-d16adede3224.png)

> So let's do some transformation

```ts
import { Transform } from "stream";
import { createWriteStream } from "fs";

const writeStream = createWriteStream("./tmp/example-write-stream.pdf");
// This will write the stream data into the open file
req.pipe(writeStream);

const myMultipartParser = new Transform({
  transform(buffer, _, done) {
    console.log(buffer);
    console.log("-".repeat(50));
    done();
  },
});
req.pipe(myMultipartParser);
req
  .on("abort", () => res.send({ aborted: 1001 }))
  .on("err", (err) => res.send(err))
  .on("data", (buffer) => {
    console.log("buffer", buffer);
  })
  .on("end", () => {
    console.log("end");
    res.status(200).json({
      body: req.body,
      headers: req.headers,
    });
  });
```

**If we have only one file it is okie to write this stream directly. But if we allow to upload multiple files. It will write into a same file if we don't know how to seperate files based on the stream data. We don't have to invent the wheel**

> In NodeJS Ecosystem, we have 2 big libraries to handle this

- [Formidable](https://www.npmjs.com/package/formidable)
- [Multer](https://www.npmjs.com/package/multer)
- [Form Data](https://www.npmjs.com/package/form-data)

**What is Pipe?**

> A pipe is a class annotated with the @Injectable() decorator, which implements the PipeTransform interface

> Pipes operate on the arguments being processed by a controller route handler.

> Nest interposes a pipe just before a method is invoked, and the pipe receives the arguments destined for the method and operates on them

So that, we can use pipes in two typical use cases:

1. Transformation : transform input data to the desired form
2. Validation : evaluate input data and if valid, simply pass it through unchanged; otherwise, throw an exception when the data is incorrect

> Let's get back to our example

In NestJS we have some built-in pipes for transformation

1. ValidationPipe

```ts

```
