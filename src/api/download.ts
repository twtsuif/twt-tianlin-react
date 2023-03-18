import service from "../utils/request";

export function downloadApplierFile(data: any) {
  return service({
    method: "get",
    url: "download/applier/file",
    params: {
      filePath: data.filePath,
    },
  });
}

export function exportApplyInfo() {
  return service({
    method: "get",
    url: "download/applyInfo",
  });
}

export function exportConfirmInfo() {
  return service({
    method: "get",
    url: "download/confirmInfo",
  });
}

export function exportAttachments() {
  return service({
    method: "get",
    url: "download/attachment",
  });
}
