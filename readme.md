# Danbooru Download Options

## Introduction

This is an unofficial tampermonkey script for danbooru, adding more download options in the danbooru sites.

## Options

The name format of the downloaded file is "XXXX-XX-XX_XXXXXX.XXX", which refers to the date time of the post and the original image format.

* Download (xxx): Showed when viewing posts. "xxx" means to download the images whose source is it.
  * Other: When xxx is other, it means to download the images that has source url but not is included in the other download options above.
  * Unknown: When xxx is unknown, it means to download the images that has no source url.

When the post is wrap by a green box, it means that the download succeeded.

When the post is wrap by a red box, it means that the download failed.

When the post is wrap by a yellow box, it means that the download is filtered.

When the post is wrap by a dotted box, it means that the download error occurred.

* Download (date): Showed when viewing one post. It just downloads the image using the name format above compared with the default download option.

## Bugs

There is probability that the download does not happen when the source is DLsite. I don't know why.
