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
import React from 'react';
import 'whatwg-fetch';
declare const Uploader: React.FC<IUploader>;
export default Uploader;
