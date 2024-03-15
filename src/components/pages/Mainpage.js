import React, { Component } from "react";
import '../../App.css';
import { MdDelete } from 'react-icons/md';
import { RxHamburgerMenu } from "react-icons/rx";
import { FiLogOut } from "react-icons/fi";
class Mainpage extends Component {
    constructor(props) {
        super(props);
        // this.inputRef = React.createRef();
        this.modalContentRef = React.createRef();
        this.state = {
            notes: [],
            title: "",
            text: "",
            id: "",
            showModal: false,
            vidible: false,
            modal_id: "",
            modalTitle: "",
            modalText: ""
        };
    }

    componentDidMount() {
        this.getData();
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    handleClickOutside = (event) => {
        // if (this.inputRef.current && !this.inputRef.current.contains(event.target)) {
        //   this.setState({ visible: false, showModal: false });
        // }
        if (!this.modalContentRef.contains(event.target)) {
            if (this.state.visible) {
                this.addNote(this.state.title, this.state.text);
            } else if (this.state.showModal) {
                this.editNote();
            }
            this.setState({ visible: false, showModal: false });
        }
    };

    async getData() {
        try {
            const response = await fetch("http://localhost:4567/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok) {
                console.log("Bad Response for sign in, The Response", response);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const rd = await response.json();
            this.setState({ notes: rd });
        } catch (error) {
            console.error("Info Error:", error);
        }
    }
    async add(newNote) {
        try {
            const response = await fetch("http://localhost:4567/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: newNote.id,
                    title: newNote.title,
                    content: newNote.text,
                })
            });
            if (!response.ok) {
                console.log("Bad Response for sign in, The Response", response);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const rd = await response.json();
            this.setState({ notes: [...this.state.notes, rd] });
        } catch (error) {
            console.error("Info Error:", error);
        }
    }
    async update(updatedNotes) {
        try {
            console.log(updatedNotes, 'updated notes inside fun')
            const response = await fetch("http://localhost:4567/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: updatedNotes.modal_id,
                    title: updatedNotes.modalTitle,
                    content: updatedNotes.modalText,
                })
            });
            if (!response.ok) {
                console.log("Bad Response for sign in, The Response", response);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const rd = await response.json();
            const notes = [...this.state.notes];
            const index = notes.findIndex(note => note._id === rd._id);
            if (index !== -1) {
                notes[index] = rd;
                this.setState({ notes });
            } else {
                console.error("Note with the provided ID not found.");
            }
        } catch (error) {
            console.error("Info Error:", error);
        }
    }
    async delete(id) {
        try {
            console.log(id, 'id')
            const response = await fetch("http://localhost:4567/delete", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id: id })
            });
            if (!response.ok) {
                console.log("Bad Response for sign in, The Response", response);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            await this.getData();
        } catch (error) {
            console.error("Info Error:", error);
        }
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const { title, text } = this.state;
        if (title || text) {
            this.addNote({ title, text });
            this.setState({ title: "", text: "" });
        }
    };

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    openModal = (id, title, text) => {
        this.setState({ showModal: true, modal_id: id, modalTitle: title, modalText: text });
        console.log(id, 'om')
    };



    closeModal = () => {
        this.setState({ showModal: false });
        this.editNote();
    };

    editNote = async () => {
        const { modal_id, modalTitle, modalText } = this.state;
        const updatedNotes = { modal_id, modalTitle, modalText };
        console.log(updatedNotes, 'updated notes')
        await this.update(updatedNotes)
        // this.setState({ notes: updatedNotes });
        this.saveNotes(updatedNotes);
    };

    addNote = async (title, text) => {
        if ((typeof title === 'string' && title.trim() !== '') || (typeof text === 'string' && text.trim() !== '')) {
            // const generateNextID = (lastID) => {
            //   const matchResult = lastID.match(/^(\d+)([A-Z]+)(\d+)$/);
            //   let [_,numPart, charPart, seqPart] = matchResult;
            //   let nextNumPart = parseInt(seqPart) + 1;
            //   console.log(nextNumPart)
            //   if (numPart > 999 &&  && nextNumPart > 999) {
            //   } else if (numPart > 999 && nextNumPart > 999) {
            //   } else if (nextNumPart > 999) {
            //     nextNumPart = '001';
            //     seqPart = nextNumPart;
            //     numPart = parseInt(numPart) + 1;
            //     numPart = String(numPart).padStart(3,'0')
            //     console.log(numPart, seqPart, 'np and seqpart')
            //   }

            //   // Pad the numeric part to ensure it has 3 digits
            //   nextNumPart = String(nextNumPart).padStart(3, '0');

            //   return `${numPart}${charPart}${nextNumPart}`;
            // };

            const newNote = {
                title,
                text,
                // color: "white",
            };
            await this.add(newNote)
            const updatedNotes = [...this.state.notes, newNote];

            this.setState({
                // notes: updatedNotes,
                title: '',
                text: '',
            }, () => {
                this.saveNotes(updatedNotes);
            });
        }
    };

    deleteNote = async (id) => {
        await this.delete(id);
        // this.saveNotes(filteredNotes);
    };

    saveNotes = (notes) => {
        localStorage.setItem('notes', JSON.stringify(notes));
    };

    render() {
        const { notes, showModal, visible, modalTitle, modalText } = this.state;

        return (
            <div className="body overflow-auto ">
                <nav className="flex justify-between items-center sticky">
                    <div className="flex">
                        <RxHamburgerMenu color="#000000" fontSize="30px" className='cursor-pointer m-8' />
                        <div className="flex items-center">
                            <img
                                className="header-logo h-[40px] w-[40px]"
                                src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
                                alt="Keep Logo"
                            />
                            <h2 className="header-title">Keep</h2>
                        </div>
                    </div>
                    <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm h-max p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <FiLogOut color="white" size='20px' onClick={() => {
                            localStorage.clear();
                            window.location.reload();
                        }} />
                        {/* <span class="sr-only">Icon description</span> */}
                    </button>
                </nav>

                <div id="form-container" className="model" ref={(ref) => (this.modalContentRef = ref)}>
                    <form id="form" className="model-content flex flex-col p-3 z-50" autoComplete="off" onSubmit={this.handleFormSubmit}>
                        <input
                            name="title"
                            value={this.state.title}
                            onChange={(e) => this.setState({ title: e.target.value })}
                            onClick={() => this.setState({ visible: true })}
                            placeholder="Title"
                            // ref={this.inputRef}
                            type="text"
                        />
                        <input
                            name="text"
                            value={this.state.text}
                            onChange={(e) => this.setState({ text: e.target.value })}
                            placeholder="Take a note..."
                            type="text"
                            // ref={this.inputRef}
                            className={`px-0 py-3 ${visible ? "" : "hidden"}`}
                        />
                        <div className={`${visible ? '' : 'hidden'}`}>
                            <button type="submit" className="modal-close-button">close</button>
                        </div>
                    </form>
                </div>

                <div id="notes">
                    {notes.map(note => (
                        <div key={note._id} className="note pb-2" style={{ background: note.color }}>
                            <div onClick={() => this.openModal(note._id, note.title, note.content)}>
                                <div className={`font-semibold ${note.title && 'note-title'}`}>{note.title}</div>
                                <p className="note-text">
                                    {note.content}
                                </p>
                            </div>
                            <div className="toolbar-container">
                                <div className="toolbar">
                                    <MdDelete className="toolbar-delete" onClick={() => this.deleteNote(note._id)} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {showModal && (
                    <div className="modal open-modal overflow-auto">
                        <div className="modal-content" ref={(ref) => (this.modalContentRef = ref)}>
                            <input
                                className="modal-title"
                                value={modalTitle}
                                onChange={e => this.setState({ modalTitle: e.target.value })}
                                placeholder="Title"
                                type="text"
                            // ref={this.titleInputRef}
                            />
                            <textarea
                                className="modal-text"
                                rows={9}
                                value={modalText}
                                onChange={e => this.setState({ modalText: e.target.value })}
                                placeholder="Take a note..."
                                // ref={this.textInputRef}
                                type="text"
                            />
                            <span className="modal-close-button" onClick={this.closeModal}>Close</span>
                        </div>
                    </div>
                )}

                {notes.length === 0 && (
                    <div id="placeholder">
                        <img id="placeholder-logo" src="https://icon.now.sh/lightbulb_outline" alt="Lightbulb Icon" />
                        <p id="placeholder-text">Notes you add appear here</p>
                    </div>
                )}
            </div>
        );
    }
}

export default Mainpage
