import EditorUseCase from "../use_cases/EditorUseCase.js";

export const EditorController = {};

EditorController.getEditor = async (req, res) => {
    try {
        const editorUseCase = new EditorUseCase();
        const result = await editorUseCase.getEditor(req.query);
        console.log(result);
        res.render('./EditorPage/EditorPage.ejs', {editor: result});
    } catch (error) {   
        console.log(error);
        res.status(400).send(error.message);
    }
}

EditorController.editorDownload = async (req, res) => {
    try {
        console.log("--------EDITOR DOWLOAD---------------")
        console.log(req.body)
        const result = await EditorUseCase.generarCodigo(req.body.html, req.body.css);
        res.set({
            'Content-Type': 'application/zip',
            'Content-Disposition': 'attachment; filename="directorio.zip"',
            'Content-Length': result.length
        });
        res.send(result);
    } catch (error) {   
        console.log(error);
        res.status(400).send(error.message);
    }
}

export default EditorController;