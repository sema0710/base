import { Box, Typography } from "@mui/material";
import {
  DocumentHeadTags,
  DocumentHeadTagsProps,
  documentGetInitialProps,
} from "@mui/material-nextjs/v13-pagesRouter"; // or `v14-pagesRouter` if you are using Next.js v14

import { Html, Head, Main, NextScript, DocumentProps } from "next/document";
import Link from "next/link";

const MyDocument = (props: DocumentProps & DocumentHeadTagsProps) => {
  const isMain = props.__NEXT_DATA__.page == "/";
  return (
    <Html lang="en">
      <Head>
        <DocumentHeadTags {...props} />
      </Head>
      <body>
        <Box
          width="100%"
          display="flex"
          justifyContent="center"
          padding="16px"
          position="absolute"
        >
          {isMain ? (
            ""
          ) : (
            <Link href="/">
              <Typography component="h1" fontSize={32} fontWeight="bold">
                BASE
              </Typography>
            </Link>
          )}
        </Box>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

MyDocument.getInitialProps = documentGetInitialProps;

export default MyDocument;
