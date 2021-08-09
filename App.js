import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import MyDrawer from "./components/MyDrawer";


export const TOKEN = 'BEARER eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJHMkpLblhwd2NZOGlSd3g1ZEZBXy00YlNoX1ZzRTE1NWVvN2JhSk9uYzBrIn0.eyJqdGkiOiJiNWY1NjliNC1lMzA5LTRmOTQtYTEwYy1hYWUwMzhjMTlkYzIiLCJleHAiOjE2Mjg1ODY2NTQsIm5iZiI6MCwiaWF0IjoxNjI4NTAwMzIzLCJpc3MiOiJodHRwczovL2Rldi5ldW5zYS5iYS9hdXRoL3JlYWxtcy9pc3NzIiwiYXVkIjoiZnJvbnRlbmQiLCJzdWIiOiIzM2YwOTMxNC04MTlhLTRjZWItOGRiMC1jYzFmN2NhYWJmYTciLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJmcm9udGVuZCIsIm5vbmNlIjoiZGVlNDYwZjAtODg1Yy00YTNkLWExMzctNDM3Njk3MTYwYTAwIiwiYXV0aF90aW1lIjowLCJzZXNzaW9uX3N0YXRlIjoiOGI0Y2Y1MzAtMzE4Ny00MDExLWE0M2EtNDFmNTJiYTkxODNmIiwiYWNyIjoiMCIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQiLCJuYW1lIjoixJBlbmFuYSBLdXN0dXJhIiwicHJlZmVycmVkX3VzZXJuYW1lIjoixJFrdXN0dXJhIiwiZ2l2ZW5fbmFtZSI6IsSQZW5hbmEiLCJmYW1pbHlfbmFtZSI6Ikt1c3R1cmEifQ.FCNjJBVBFtjfD56QF2x9IoTcvOLXIlTwJ6AjIrK_QkVcJn-daEbXu258UJWEaArct1sYE0wpewX4xxbVRcQJAuyxD58m5abZbddbq8-jsPq6yPj0ovZbZCV7cV04QAYmBn9DPQl7i0ZqGWLCbb0smaoIfmhK3ImQeGw2QlnHjc_NdJV304xX_Bjbtq6tmi1p8JO0XD5zF_hKay74FvEbaTlUTcjd9ocbsYXlWN8nD3FM0CYhPMmc0XS3vJU8XfLoRGLQKGUj_0-qX_aqgCp30fwJTo7UBcxjPagESJfCjeW1mucONuzWDUg5W5aCursvhwAemXq8mFNlutGAndIhvQ'


export default function App() {
    return (

        <NavigationContainer>
            <MyDrawer />
        </NavigationContainer>

    );
}


