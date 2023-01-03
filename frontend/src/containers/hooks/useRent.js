import { useMutation, useQuery } from "@apollo/client"
import {
  LOGIN_MUTATION,
  LOGOUT_MUTATION,
  REGISTER_MUTATION,
} from "../../graphql"
import { createContext, useContext, useEffect, useState } from "react"
import { USERS_QUERY } from "../../graphql/queries"

const LOCALSTORAGE_REMEMBER = "rememberUser"
const rememberUser = localStorage.getItem(LOCALSTORAGE_REMEMBER)
const LOCALSTORAGE_TOKEN = "authenticationToken"
const localToken = localStorage.getItem(LOCALSTORAGE_TOKEN)

const RentContext = createContext({
  username: "",
  passwd: "",
  identity: "",
  signedIn: false,
  remUser: false,
  token: "",
  renderLoading: false,
})
const RentProvider = (props) => {
  const [username, setUsername] = useState("")
  const [passwd, setPasswd] = useState("")
  const [identity, setIdentity] = useState("")
  const [signedIn, setSignedIn] = useState(false)
  const [remUser, setRemUser] = useState(rememberUser || true)
  const [token, setToken] = useState(localToken || "")
  const [isLoading, setIsLoading] = useState(false)
  const [renderLoading, setRenderLoading] = useState(true)

  const QueryResult = useQuery(USERS_QUERY, {
    variables: {
      token: token,
    },
    pollInterval: 1,
  })

  const [login] = useMutation(LOGIN_MUTATION)
  const [register] = useMutation(REGISTER_MUTATION)
  const [logout] = useMutation(LOGOUT_MUTATION)
  //   useEffect(() => {
  //     if (signedIn) {
  //       localStorage.setItem(LOCALSTORAGE_KEY, username)
  //     }
  //   }, [signedIn])
  useEffect(() => {
    localStorage.setItem(LOCALSTORAGE_REMEMBER, remUser)
  }, [remUser])
  useEffect(() => {
    if (isLoading) setRenderLoading(true)
    else {
      setTimeout(() => {
        setRenderLoading(false)
      }, 300)
    }
  }, [isLoading])
  useEffect(() => {
    localStorage.setItem(LOCALSTORAGE_TOKEN, token)
    const { data, loading, error } = QueryResult
    // console.log(loading)
    setIsLoading(loading)
    if (token && !error && data) {
      // console.log(data)
      const { users } = data
      setSignedIn(true)
      setUsername(users.username)
      setIdentity(users.identity)
    } else {
      // console.log(error)
      setSignedIn(false)
    }
  })

  return (
    <RentContext.Provider
      value={{
        username,
        passwd,
        identity,
        signedIn,
        remUser,
        token,
        renderLoading,
        setUsername,
        setPasswd,
        setIdentity,
        setSignedIn,
        setRemUser,
        setToken,
        setRenderLoading,
        login,
        register,
        logout,
      }}
      {...props}
    />
  )
}

const useRent = () => useContext(RentContext)
export { RentProvider, useRent }