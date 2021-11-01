class Admin {
    constructor(url) {
        this.url = url
      }
    getViewMain(typeView){
        switch(typeView){
            case 'form' : return this.getViewForm()
            default : return this.getViewTable()
        }
    }
    getViewTable (){
        return 'this is table'
    }
    getViewForm(){
        return `
            <h1> toi di code dao </h1>
        `
    }   
}
module.exports = Admin