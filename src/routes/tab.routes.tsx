import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Auth from "../screens/Auth";
import TaskList from "../screens/TaskList";

const Tab = createBottomTabNavigator()

export default function TabRoutes() {
    return(
        <Tab.Navigator>
            <Tab.Screen
                name="home" component={Auth}/>
            <Tab.Screen
                name="tasklist" component={TaskList}/>
        </Tab.Navigator>
    )
}