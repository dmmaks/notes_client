import { FormGroup } from "@angular/forms";

export class NoteFormError{
form: FormGroup;

  get control() {
    return this.form.controls;
  }

    get contentErrorMessage(): string {
        return this.control['content'].hasError('required') ?
          'Enter the content for the note' :
          this.control['content'].hasError('maxlength') ?
            'Max length is 10000' : 
            this.control['content'].hasError('minlength') ?
            'Min length is 5' :'';
      }

      get nameErrorMessage(): string {
        return this.control['name'].hasError('required') ?
          'Enter name' :
          this.control['name'].hasError('maxlength') ?
            'Max length is 100' : 
            this.control['content'].hasError('minlength') ?
            'Min length is 5' :'';
      }

      get name(): string{
        return this.control['name'].value;
      }

      get content(): string{
        return this.control['content'].value;
      }

      get access(): string{
        return this.control['access'].value;
      }

}