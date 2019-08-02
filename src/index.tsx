/**
 * declares and imports of namespaces, interfaces & types
 */
export interface IUploader {
  children?: any;
  width?: number;
  height?: number;
  address?: string;
  onProgress?: (percent: number) => void;
  onFail?: () => void;
  onCancel?: () => void;
  onFinished?: () => void;
  onComplete?: (response: Response) => void;
  onFileAdd?: (file: File) => void;
  onFormData?: (form: FormData) => void;
  onRequest?: (req: XMLHttpRequest) => void;
}

 /**
  * imports of packages
  */
import React from 'react';
import 'whatwg-fetch';

/**
 * imports of styles
 */
import { UploaderInput, UploaderSection } from './index.styles'

type InputFile = string | number | string[] | undefined;

function parseHeaders(rawHeaders: string) {
  const headers = new Headers();
  // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
  // https://tools.ietf.org/html/rfc7230#section-3.2
  const preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
  preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
    const parts = line.split(':');
    const key = parts.shift();
    if (key) {
      const value = parts.join(':').trim();
      headers.append(key.trim(), value);
    }
  })
  return headers;
}

const Uploader: React.FC<IUploader> = ({width, height, children, ...props}) => {
  // const [value, setValue] = React.useState<InputFile>(undefined)
  const updateProgress = function(this: XMLHttpRequestUpload, ev: ProgressEvent) {
    if (props.onProgress) {
      props.onProgress(ev.loaded / ev.total * 100)
    }
  };
  const transferComplete = function(this: XMLHttpRequestUpload, ev: ProgressEvent) {
    if (props.onFinished) {
      props.onFinished();
    }
  };
  const transferFailed = function(this: XMLHttpRequestUpload, ev: ProgressEvent) {
    if (props.onFail) {
      props.onFail();
    }
  };
  const transferCanceled  = function(this: XMLHttpRequestUpload, ev: ProgressEvent) {
    if (props.onCancel) {
      props.onCancel();
    }
  };
  const reqComplete  = function(this: XMLHttpRequest, ev: ProgressEvent) {
    if (this.status !== 200 && this.status !== 201) {
      if (props.onFail) {
        props.onFail();
      }
    } else if (props.onComplete) {
      const {status, statusText, getAllResponseHeaders} = this;
      const headers = parseHeaders(getAllResponseHeaders() || '');
      const res = new Response(this.response, {status, statusText, headers});
      props.onComplete(res);
    }
  };

  const doUpload = (file: File) => {

    const data = new FormData();
    data.append('inputname', file);
  
    const req = new XMLHttpRequest();
    req.open('POST', '');

    req.upload.addEventListener("progress", updateProgress);
    req.upload.addEventListener("load", transferComplete);
    req.upload.addEventListener("error", transferFailed);
    req.upload.addEventListener("abort", transferCanceled);
    req.addEventListener('load', reqComplete)
    req.addEventListener('timeout', transferFailed)

    req.send(data);
  }
  
  const onDrop = (ev: React.DragEvent<HTMLDivElement>) => {  // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
    const {items} = ev.dataTransfer;
    if (items && items.length > 0 && ev.dataTransfer.items[0].kind === 'file') {
      // Use DataTransferItemList interface to access the file(s)
        if (ev.dataTransfer.items[0].kind === 'file') {
          const file = ev.dataTransfer.items[0].getAsFile();
          if (file !== null) {
            doUpload(file);
          }
        }
    } else {
      const { files } = ev.dataTransfer;
      if (files === null || files.length < 1) {
        return;
      }
      doUpload(files[0]);
    }
  }
  
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore

    const { files } = event.target;
    if (files === null || files.length < 1) {
      return;
    }
    doUpload(files[0]);
  }

  const el = <>
  <div style={UploaderSection}>
    <span>Drag a photo here or click to choose file</span>
    {children}
  </div>
  <input style={UploaderInput} onDrop={onDrop} type={'file'} accept="image/*"  
    multiple={false}
    onChange={e=> onChange(e)} />
  </>

  if (width || height) {
    return <div style={{width: width || '100%', height: height || '100%'}}>
      {el}
    </div>
  }
  return el;
};

export default Uploader;
