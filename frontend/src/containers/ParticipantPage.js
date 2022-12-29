import React, {useState} from "react"
import styled from "styled-components"
import PersonalBar from '../components/PersonalBar'
import Calendar from '../components/Calendar'
import EventList from '../components/EventList'

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const BodyWrapper = styled.div`
    margin-top: 100px;
    height: 90%;
    
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    overflow: auto;
`

const EventWrapper = styled.div`
    height:100%;
    width:30%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    overflow: auto;
`

const Participant = () => {
    const [user, setUser] = useState("Oscar")
    const [info, setInfo] = useState([{"date": "12/31", "name": "New Year", "subtitle": "time flies", "property":["popular", "nice"]}])

    return (
        <Wrapper>
            <PersonalBar Username={user} />
            <BodyWrapper>
                 <Calendar />
                 <EventWrapper>
                    <EventList info={info}></EventList>
                 </EventWrapper>
            </BodyWrapper>
        </Wrapper>
    )
}

export default Participant