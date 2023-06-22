import React, { useState, useRef } from 'react';
import { Slack, AlertCircle } from 'lucide-react';
import { BodyText2, BodyText3, Label1, Label2, Label3, Label4 } from '../styles/components/Typography';
import { Card } from '../styles/components/Card.style';
import { StyledInput } from '../styles/components/Input.style';
import Dropdown from './Dropdown';
import Button from './Button';
import Modal from './Modal';
import PasswordField from './PasswordField';
import useClickListener from '../hooks/useClickListener';
import useEscapeListener from '../hooks/useEscapeListener';
import Accordion from './Accordion';

const StyleTest = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const closeModal = () => (setModalOpen(false));
    const openModal = () => (setModalOpen(true));

    const closeDropdown = () => (setDropdownOpen(false));
    const openDropdown = () => (setDropdownOpen(true));

    const closeDropdownIfOpen = () => {
        if (dropdownOpen) {
            closeDropdown();
        }
    };

    const wrapperRef = useRef("menu");
    useClickListener(wrapperRef, closeDropdown);
    useEscapeListener(closeDropdownIfOpen);

    const SampleHeaderContent = () => (
        <div>
          <div>Open accordion</div>
        </div>
    )

    return (
        <div>
 
            <div style={{ width: '600px', margin: 'auto'}}>
                <h1>I am an h1 header</h1>
                <h2>I am an h2 header</h2>
                <h3>I am H3</h3>
                <h4>I am h4</h4>
                I am just regular body copy.
                <BodyText2>body 2</BodyText2>
                <BodyText3>body 3</BodyText3>
                <div>
                    <Label1>Label1</Label1>
                </div>
                <div>
                    <Label2>Label2</Label2>
                </div>
                <div>
                    <Label3>Label3</Label3>
                </div>
                <div>
                    <Label4>Label4</Label4>
                </div>
                <h3>Colors:</h3>
                <div>
                    <div style={{ backgroundColor: 'var(--managementBlue)', color: 'var(--white)'}}>ManagementBlue</div>
                    <div style={{ backgroundColor: 'var(--managementBlue2)'}}>ManagementBlue2</div>
                    <div style={{ backgroundColor: 'var(--managementBlue3)'}}>ManagementBlue3</div>
                    <div style={{ backgroundColor: 'var(--volunteerGreen)'}}>volunteerGreen</div>
                    <div style={{ backgroundColor: 'var(--lightPeach)'}}>lightPeach</div>
                    <div style={{ backgroundColor: 'var(--uiBlue)'}}>uiBlue</div>
                    <div style={{ backgroundColor: 'var(--uiError)'}}>uiError</div>
                    <div style={{ backgroundColor: 'var(--blueShadeIII)', color: 'var(--white)'}}>blueShadeIII</div>
                    <div style={{ backgroundColor: 'var(--white)'}}>white</div>
                    <div style={{ backgroundColor: 'var(--peachShade1)'}}>peachShade1</div>
                    <div style={{ backgroundColor: 'var(--peachShade2)'}}>peachShade2</div>
                    <div style={{ backgroundColor: 'var(--blueShade1)'}}>blueShade1</div>
                    <div style={{ backgroundColor: 'var(--blueShade2)'}}>blueShade2</div>
                    <div style={{ backgroundColor: 'var(--lightBlueGrey)'}}>lightBlueGrey</div>
                </div>
                <Button variant='solid blue' onClick={() => console.log('clicked')} icon={Slack} >
                    Test Button
                </Button> 
                <Button variant='solid white' icon={AlertCircle} iconSize='18'>
                    Test Button
                </Button>
                <Button variant='solid red'>
                    Test Button
                </Button>
                <Button variant='outline blue'>
                    Test Button
                </Button>
                <Button variant='fw outline blue'>
                    Test Button
                </Button>
                <Button variant='fw outline white'>
                    Test Button
                </Button>
                <Button variant='text-only red'>
                    Test Button
                </Button>
                <p />
                <Card>
                    I am a card. 
                </Card>
                <div style={{ marginBottom: '15px' }} />
                <Button type="button" onClick={openModal}>Pop a simple modal</Button>
                <div ref={wrapperRef} style={{marginBottom: '16px'}}>
                    <Button type="button" onClick={openDropdown}>Open dropdown</Button>
                    <Dropdown isOpen={dropdownOpen}>
                        <h3>Dropdown!</h3>
                    </Dropdown>
                </div>
                <Accordion header={<SampleHeaderContent />}>
                    <p>Content for accordion</p>
                </Accordion>

                <StyledInput placeholder="Regular Input Field" />
                <PasswordField placeholder="Password" />

            </div>
            <Modal isOpen={modalOpen} closeFn={closeModal}>
                <h2>Test Modal</h2>
            </Modal>
        </div>
    );
};

export default StyleTest;
