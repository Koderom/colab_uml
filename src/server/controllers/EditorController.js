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

export default EditorController;