import { Resolver, Query, Mutation, Arg, FieldResolver, Root } from 'type-graphql'
import { CreateAppointmentInput } from '../dtos/inputs/create-appointment-input'
import { CreateCustomerInput } from '../dtos/inputs/create-customer-input'
import { AppointmentModel } from '../dtos/models/appointment-model'
import { CustomerModel } from '../dtos/models/customer-model'
const crypto = require('node:crypto')

const appointments: any[] = []
const customers: any[] = []

@Resolver(() => AppointmentModel)
export class AppointmentsResolver {
  @Query( () => String )
  async helloWorld() {
    return 'Hello world'
  }

  @Query( () => [AppointmentModel] )
  async appointments() {
    return appointments
  }

  @Mutation(() => AppointmentModel)
  async createAppointment(@Arg('data', () => CreateAppointmentInput) data: CreateAppointmentInput) {    
    const appointment = {      
      id: crypto.randomUUID(),
      startsAt: data.startsAt,
      endsAt: data.endsAt,
      customerId: data.customerId
    }

    appointments.push(appointment)

    return appointment
  }

  // todo: move this to a isolated resolver and add real database
  @Mutation(() => CustomerModel)
  async createCustomer(@Arg('data', () => CreateCustomerInput) data: CreateCustomerInput) {
    const customer = {
      id: crypto.randomUUID(),
      name: data.name,
    }

    customers.push(customer)

    return customer
  }

  @FieldResolver(() => CustomerModel)
  customer(@Root() appointment: AppointmentModel) {
    const customer = customers.find(c=> c.id == appointment.customerId)
    return customer
  }
}