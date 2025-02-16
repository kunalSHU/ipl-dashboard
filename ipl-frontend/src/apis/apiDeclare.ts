export interface IJourneyDocumentResponse {
    clientDocuments: Array<IClientDocument>
}

export interface IClientDocument {
    documentRequestedDate: string,
    caseId: string,
    companyName: string,
    clientEmail: string,
    contactId: string,
    document: IDocument
}

export interface IDocument {
    documentDescription: string,
    documentDisplayName: string,
    documentCategory: string,
    status: ["AWAITING CLIENT ACTION"| "REVIEWED" | "COMPLETE"],
    files: Array<IFile>
}

export interface IFile {
    fileId: string,
    fileName: string,
    reviewStatus: string,
    uploadedBy: string,
    uploadedTime: string,
    size: string,
    commentDate: string,
    commentDescription: string,
    commentedBy: string
}