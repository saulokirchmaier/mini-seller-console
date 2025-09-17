import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useOpportunities } from '../../contexts/OpportunitiesContext';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from '../ui/drawer';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { OpportunityStage } from '../../types/Opportunity';
import { X } from 'lucide-react';

interface FormData {
  name: string;
  accountName: string;
  stage: OpportunityStage;
  amount: string;
}

export const OpportunityDrawer = () => {
  const { selectedOpportunity, setSelectedOpportunity, updateOpportunity } =
    useOpportunities();

  const form = useForm<FormData>({
    defaultValues: {
      name: '',
      accountName: '',
      stage: 'discovery' as OpportunityStage,
      amount: '',
    },
  });

  // Update form when an opportunity is selected
  useEffect(() => {
    if (selectedOpportunity) {
      form.reset({
        name: selectedOpportunity.name,
        accountName: selectedOpportunity.accountName,
        stage: selectedOpportunity.stage,
        amount: selectedOpportunity.amount
          ? String(selectedOpportunity.amount)
          : '',
      });
    }
  }, [selectedOpportunity, form]);

  const onSubmit = async (data: FormData) => {
    if (!selectedOpportunity) return;

    const updatedData = {
      name: data.name,
      accountName: data.accountName,
      stage: data.stage,
      amount: data.amount ? parseFloat(data.amount) : undefined,
    };

    const success = await updateOpportunity(
      selectedOpportunity.id,
      updatedData
    );
    if (success) {
      setSelectedOpportunity(null);
    }
  };

  return (
    <Drawer
      open={!!selectedOpportunity}
      onOpenChange={open => !open && setSelectedOpportunity(null)}
    >
      <DrawerContent>
        <div className="flex flex-col">
          <DrawerHeader className="border-b">
            <div className="flex items-center justify-between">
              <DrawerTitle className="text-xl md:text-2xl font-bold text-center w-full">
                {selectedOpportunity?.name}
              </DrawerTitle>
              <DrawerClose asChild>
                <Button variant="ghost" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
            </div>
          </DrawerHeader>

          <div className="space-y-4 w-full max-w-md mx-auto">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="px-4">
                <div className="grid gap-4 py-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Opportunity name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="accountName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account</FormLabel>
                        <FormControl>
                          <Input placeholder="Account name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="stage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stage</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a stage" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="discovery">DISCOVERY</SelectItem>
                            <SelectItem value="proposal">PROPOSAL</SelectItem>
                            <SelectItem value="negotiation">
                              NEGOTIATION
                            </SelectItem>
                            <SelectItem value="closed_won">
                              CLOSED WON
                            </SelectItem>
                            <SelectItem value="closed_lost">
                              CLOSED LOST
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0.00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <DrawerFooter>
                  <div className="space-y-4 flex flex-col md:flex-row justify-center gap-4 md:gap-8">
                    <Button type="submit" className="bg-blue-800 text-white">
                      Save changes
                    </Button>
                    <DrawerClose asChild>
                      <Button variant="destructive">Cancel</Button>
                    </DrawerClose>
                  </div>
                </DrawerFooter>
              </form>
            </Form>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
