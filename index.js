
function configureEditor(editor) {
  editor.setTheme("ace/theme/monokai");
  editor.setOptions({ enableBasicAutocompletion: true, enableLiveAutocompletion: true, enableSnippets: true });
}

const htmlEditor = ace.edit("htmlEditor");
htmlEditor.session.setMode("ace/mode/html");
configureEditor(htmlEditor);

const cssEditor = ace.edit("cssEditor");
cssEditor.session.setMode("ace/mode/css");
configureEditor(cssEditor);

const jsEditor = ace.edit("jsEditor");
jsEditor.session.setMode("ace/mode/javascript");
configureEditor(jsEditor);

document.getElementById("toggleMode").addEventListener("click", function() {
  document.body.classList.toggle("dark-mode");
});

document.getElementById("pasteHtml").addEventListener("click", function() {
  navigator.clipboard.readText().then(text => {
    htmlEditor.setValue(text, -1);
  });
});

document.getElementById("pasteCss").addEventListener("click", function() {
  navigator.clipboard.readText().then(text => {
    cssEditor.setValue(text, -1);
  });
});

document.getElementById("pasteJs").addEventListener("click", function() {
  navigator.clipboard.readText().then(text => {
    jsEditor.setValue(text, -1);
  });
});

document.getElementById("runCode").addEventListener("click", function() {
  const htmlCode = htmlEditor.getValue();
  const cssCode = `<style>${cssEditor.getValue()}</style>`;
  const jsCode = `<scri>${jsEditor.getValue()}<\/script>`;
  const combinedCode = htmlCode + cssCode + jsCode;
  const outputFrame = document.getElementById("outputFrame");
  outputFrame.srcdoc = combinedCode;
});

// إضافة حدث الضغط المزدوج على المحرر لفتح القائمة
const editors = [htmlEditor, cssEditor, jsEditor];
editors.forEach(editor => {
  editor.container.addEventListener('dblclick', function(event) {
    // تحديد مكان ظهور القائمة بناءً على مكان الضغط
    const contextMenu = document.getElementById("contextMenu");
    contextMenu.style.left = event.pageX + 'px';
    contextMenu.style.top = event.pageY + 'px';
    contextMenu.style.display = 'block';

    // حفظ المحرر الحالي
    window.selectedEditor = editor;
  });
});

// إخفاء القائمة عند النقر في أي مكان آخر
document.addEventListener('click', function(event) {
  const contextMenu = document.getElementById("contextMenu");
  if (!contextMenu.contains(event.target)) {
    contextMenu.style.display = 'none';
  }
});

// إضافة وظائف للخيارات
document.getElementById("copyBtn").addEventListener("click", function() {
  const editor = window.selectedEditor;
  const content = editor.getValue();
  navigator.clipboard.writeText(content).then(() => {
    alert("تم النسخ إلى الحافظة!");
  });
  document.getElementById("contextMenu").style.display = 'none';
});

document.getElementById("pasteBtn").addEventListener("click", function() {
  const editor = window.selectedEditor;
  navigator.clipboard.readText().then(text => {
    editor.setValue(text, -1);
  });
  document.getElementById("contextMenu").style.display = 'none';
});

document.getElementById("deleteBtn").addEventListener("click", function() {
  const editor = window.selectedEditor;
  editor.setValue("", -1);
  document.getElementById("contextMenu").style.display = 'none';
});
